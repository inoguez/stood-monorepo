import express from 'express';
import dotenv from 'dotenv';
import { FriendController } from '../controllers/FriendController';
dotenv.config();

const router = express.Router();

// Ruta para obtener todos los amigos
router.get('/', FriendController.getAllFriends);

// Ruta para añadir un nuevo amigos
router.post('/', FriendController.addFriend);

// Ruta para eliminar un amigo existente
router.delete('/', FriendController.deleteFriend);

export default router;
