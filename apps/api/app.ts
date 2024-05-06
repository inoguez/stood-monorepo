// Importa el módulo Express
import express from 'express';
import logger from 'morgan';
import Pusher from 'pusher';
import requestRouter from './routes/request';
import authRouter from './routes/oauth';
import friendRouter from './routes/friends';
import userRouter from './routes/users';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// Crea una instancia de la aplicación Express
const app = express();
app.use(cors());
app.use(logger('dev'));
// Define el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 4000;
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.use('/oauth', authRouter);
app.use('/request', requestRouter);
app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use(express.json());

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
