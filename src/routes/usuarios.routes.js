import {Router} from "express";
import { getUsuarios, createUsuario, getUserByDoc, deleteUser, actualizarUsuario } from "../controllers/usuarios.controller";

const router = Router();

router.get('/usuarios', getUsuarios )

router.get('/usuarios/:id', getUserByDoc )

router.post('/usuarios', createUsuario )

router.put('/usuarios/:id', actualizarUsuario )

router.delete('/usuarios/:id', deleteUser )

export default router