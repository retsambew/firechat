import express from "express";
import {createUser, login, logout, readUsers} from '../controllers/auth.js'

const router= express.Router();

router.get('/login',login); // TODO - should return login view
router.post('/login',login);
router.get('/logout',logout);
//router.get('/signup',getClubs);
router.post('/signup',createUser);
router.get('/users',readUsers);

export default router;