import express from 'express';
import dotenv from 'dotenv';
import { NotificationController } from '../controllers/NotificationController';
dotenv.config();

const router = express.Router();

// Ruta para obtener todos los amigos
router.get('/', NotificationController.getAllNotifications);

// Ruta para añadir un nuevo amigos
// router.post('/', NotificationController.addFriend);

// Ruta para eliminar un amigo existente
// router.delete('/', NotificationController.deleteFriend);

export default router;
