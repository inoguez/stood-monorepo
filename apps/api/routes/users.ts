import express from 'express';
import dotenv from 'dotenv';
import { UserController } from '../controllers/UserController';
dotenv.config();

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// router.get('/:id', UserController.getUserById);

router.get('/authenticated', UserController.getUserAuthenticated);

router.get('/search', UserController.getUsersByTerm);

// Ruta para crear un nuevo usuario
router.post('/', UserController.createUser);

// Ruta para actualizar un usuario existente

export default router;
