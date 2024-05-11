import { OAuth2Client } from 'google-auth-library';
import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { CookieOptions } from 'express';
import { db, users } from '@stood/database';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { sql } from 'drizzle-orm';
dotenv.config();

const redirectUrl = process.env.REDIRECT_URL;

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirectUrl
);
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const ACCESS_TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

const ACCESS_COOKIE_EXPIRATION_MS = 1 * HOUR_MS;
const REFRESH_COOKIE_EXPIRATION_MS = 7 * DAY_MS;
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const userData = jwt.verify(
      refreshToken,
      JWT_SECRET as string
    ) as JwtPayload;
    const newAccessToken = jwt.sign(
      { userId: userData.id },
      JWT_SECRET as string,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );
    const newFreshToken = jwt.sign(
      { userId: userData.id },
      JWT_SECRET as string,
      {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }
    );
    //Delete cookies
    res.cookie('accessToken', '', accessTokenCookieOptions(0));
    res.cookie('refreshToken', '', refreshTokenCookieOptions(0));

    //Set new Cookies for the new Tokens
    res.cookie(
      'accessToken',
      newAccessToken,
      accessTokenCookieOptions(Date.now() + ACCESS_COOKIE_EXPIRATION_MS)
    );
    res.cookie(
      'refreshToken',
      newFreshToken,
      refreshTokenCookieOptions(Date.now() + REFRESH_COOKIE_EXPIRATION_MS)
    );
    res.json({ message: 'Tokens refreshed' });
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
});

router.get('/isSignedIn', (req, res) => {
  const accessToken = req.headers['authorization'];
  console.log(accessToken, 'zzzzz');
  console.log('access', accessToken);
  if (!accessToken) {
    return res
      .status(401)
      .json({ isSignedIn: false, message: 'Sin iniciar sesión' });
  }

  jwt.verify(accessToken, JWT_SECRET as string, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        isSignedIn: false,
        message: 'Sin iniciar sesión',
        error: error?.message,
      });
    }
    res.json({ isSignedIn: true, message: 'Signed In', user: decoded });
  });
});
``;
router.get('/logout', (req, res) => {
  res.cookie('accessToken', '', accessTokenCookieOptions(0));
  res.cookie('refreshToken', '', refreshTokenCookieOptions(0));
  res.redirect((process.env.FRONTEND_URL as string) + '/auth');
});

router.get('/', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oAuth2Client.getToken(code as string);

  try {
    await oAuth2Client.setCredentials(tokens);

    const { data }: { data: any } = await oAuth2Client.request({
      url: `https://www.googleapis.com/oauth2/v3/userinfo`,
    });

    const user = {
      id: nanoid(),
      name: data.name,
      email: data.email,
      picture: data.picture,
      updatedAt: sql<string>`(CURRENT_TIMESTAMP)`,
    };

    const [newUser] = await db
      .insert(users)
      .values(user)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          name: user.name,
          email: user.email,
          picture: user.picture,
          updatedAt: user.updatedAt,
        },
      })
      .returning();

    console.log(newUser, 'newUser');

    const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign(
      { userId: newUser.id },
      JWT_SECRET as string,
      {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }
    );

    res.cookie(
      'accessToken',
      accessToken,
      accessTokenCookieOptions(Date.now() + ACCESS_COOKIE_EXPIRATION_MS)
    );
    console.log('refresh', refreshToken);

    res.cookie(
      'refreshToken',
      refreshToken,
      refreshTokenCookieOptions(Date.now() + REFRESH_COOKIE_EXPIRATION_MS)
    );

    return res.redirect(process.env.FRONTEND_URL as string);
  } catch (error) {
    console.log('error with sign in with google', error);
  }
});

//UTILS
function accessTokenCookieOptions(expires_ms: number) {
  console.log(expires_ms);
  let cookieOptions: CookieOptions = {
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(expires_ms),
  };
  return cookieOptions;
}
function refreshTokenCookieOptions(expires_ms: number) {
  console.log(expires_ms);
  let cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(expires_ms),
  };
  return cookieOptions;
}

export default router;
