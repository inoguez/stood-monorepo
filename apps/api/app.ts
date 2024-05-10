// Importa el módulo Express
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import Pusher from 'pusher';
import requestRouter from './routes/request';
import authRouter from './routes/oauth';
import friendRouter from './routes/friends';
import friendRequestRouter from './routes/friendRequest';
import userRouter from './routes/users';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cors from 'cors';
import { UserController } from './controllers/UserController';
import bodyParser from 'body-parser';
dotenv.config();
// Crea una instancia de la aplicación Express
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 4000;
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.use('/oauth', authRouter);
app.use('/request', requestRouter);
app.use('/users', isAuthenticated, userRouter);
app.use('/friends', isAuthenticated, friendRouter);
app.use('/friendRequest', isAuthenticated, friendRequestRouter);
app.use(express.json());

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('IIIIII');
  const accessToken = req.headers['authorization'];
  console.log(accessToken, 'middleware');
  if (!accessToken) {
    return res.status(401).redirect('/auth');
  }
  console.log('IIIIII2');

  const { userId, exp } = jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  console.log('IIIIII3', userId);
  console.log('Expiration', exp);
  console.log('Date Now', Date.now());

  if (!userId) return res.status(401).redirect('/auth');
  console.log('IIIIII4');

  const [user] = await UserController.userExistsById(userId);
  console.log(user, 'aaazzzz');
  if (!user) return res.status(401).redirect('/auth');

  console.log(accessToken, 'pasopa');
  return next();
}

// Define una ruta básica
// app.get('/', async (req, res) => {
//   const usuarios = await db.query.users.findMany();
//   console.log(usuarios);
//   res.send(usuarios);
// });

const pusher = new Pusher({
  appId: process.env.APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: 'us2',
  useTLS: true,
});

app.post('/api/messages', async (req, res) => {
  console.log(req.body, '****');
  await pusher.trigger('chat', 'message', {
    username: req.body.username,
    message: req.body.message,
  });
  res.json([]);
});
