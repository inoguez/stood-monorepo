// Importa el módulo Express
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import Pusher from 'pusher';
import requestRouter from './routes/request';
import authRouter from './routes/oauth';
import friendRouter from './routes/friends';
import friendRequestRouter from './routes/friendRequest';
import notificationRouter from './routes/notifications';
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
app.use('/notifications', isAuthenticated, notificationRouter);

app.use(express.json());

export interface AuthenticatedRequest extends Request {
  userId?: string; // Define userId como opcional
}

async function isAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers['authorization'];
  if (!accessToken) {
    return res.status(401).redirect('/auth');
  }
  const { userId, exp } = jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  if (!userId) return res.status(401).redirect('/auth');

  const [user] = await UserController.userExistsById(userId);
  if (!user) return res.status(401).redirect('/auth');
  req.userId = user.id;
  console.log('Middleware passed');
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
