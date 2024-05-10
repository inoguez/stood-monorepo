import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://localhost:4000/oauth/google/callback';

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile openid',
      'https://www.googleapis.com/auth/userinfo.email openid',
    ],
    prompt: 'consent',
  });

  console.log(authorizeUrl, 'authrul');
  res.json({
    url: authorizeUrl,
  });
});
export default router;
