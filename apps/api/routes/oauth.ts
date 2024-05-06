import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import express, { CookieOptions } from 'express';
import dotenv from 'dotenv';
import { db } from '../models/connection';
import { users } from '../models/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { UserController } from '../controllers/UserController';
dotenv.config();

const redirectUrl = process.env.REDIRECT_URL;

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirectUrl
);

const ACCESS_COOKIE_EXPIRATION_MS = 60 * 60 * 1000;
const REFRESH_COOKIE_EXPIRATION_MS = 7 * (24 * (60 * 60 * 1000));
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

const router = express.Router();

router.get('/isSignedIn', (req, res) => {
  const accessToken = req.headers['authorization'];

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
    let id = nanoid();
    const userCreated = await insertOrUpdateUser({
      id: id,
      email: data.email,
      name: data.name,
      accessToken: tokens.access_token as string,
      refreshToken: tokens.refresh_token as string,
      createdAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
    });

    const accessToken = jwt.sign({ userId: data.id }, JWT_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = jwt.sign({ userId: data.id }, JWT_SECRET as string, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
    console.log('access', accessToken);

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
    const params = new URLSearchParams();
    res.header('Content-Type', 'application/json');
    res.header('Authorization', `Bearer ${accessToken}`);
    // Agregar múltiples parámetros de consulta
    params.append('accessToken', accessToken);
    params.append('refreshToken', refreshToken);
    return res.redirect(
      (process.env.FRONTEND_URL as string) + `?${params.toString()}`
    );
  } catch (error) {
    console.log('error with sign in with google', error);
  }
});

//UTILS
function accessTokenCookieOptions(expires_ms: number) {
  console.log(expires_ms);
  let cookieOptions: CookieOptions = {
    secure: true,
    sameSite: 'strict',
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
    sameSite: 'strict',
    path: '/',
    expires: new Date(expires_ms),
  };
  return cookieOptions;
}

type NewUser = typeof users.$inferInsert;
const insertOrUpdateUser = async (user: NewUser) => {
  const isUserOnDB = await UserController.userExists(user.email as string);

  return isUserOnDB
    ? db
        .update(users)
        .set({
          email: user.email,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          updatedAt: new Date().toLocaleString('es-MX', { timeZone: 'UTC' }),
        })
        .where(eq(users.id, user.id as string))
    : db.insert(users).values(user);
};
export default router;
