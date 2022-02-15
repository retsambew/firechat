import express from "express";
import {deleteUser,profile,sendRequest,getUser} from '../controllers/profile.js'

const router= express.Router();

// router starts with /profile
router.get('/',profile);
router.post('/',getUser); // takes uid through body.
router.delete('/',deleteUser);
router.get('/:uid',getUser);
router.post('/:uid',sendRequest);

export default router;