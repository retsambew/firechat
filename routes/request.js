import express from "express";
import {sendRequest,acceptRequest,getRequests,rejectRequest, getPendingRequests} from '../controllers/request.js'

const router= express.Router();

router.get('/',getRequests)
router.get('/pending',getPendingRequests)
router.post('/send',sendRequest);
router.post('/accept',acceptRequest);
router.post('/reject',rejectRequest);

export default router;