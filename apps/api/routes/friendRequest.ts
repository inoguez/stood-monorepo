import express from 'express';
import dotenv from 'dotenv';
import { FriendController } from '../controllers/FriendController';
import { FriendRequestController } from '../controllers/FriendRequestController';
dotenv.config();

const router = express.Router();

// Ruta para obtener todos los amigos
router.get('/', FriendRequestController.getAllFriendRequests);

// Ruta para añadir un nuevo amigos
router.post('/send', FriendRequestController.sendFriendRequest);
router.post('/respond', FriendRequestController.respondToFriendRequest);

export default router;
