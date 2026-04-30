import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createContent, getContent, updateContent, deleteContent, shareBrain, getSharedBrain } from "../controllers/contentController.js";

const contentRouter = Router();

contentRouter.get('/brain/:shareLink', getSharedBrain);

contentRouter.use(authMiddleware);

contentRouter.post('/create-content', createContent);

contentRouter.get('/get-content', getContent);

contentRouter.put('/update-content/:contentId', updateContent);

contentRouter.delete('/delete-content/:contentId', deleteContent);

contentRouter.post('/brain/share', shareBrain);

export default contentRouter;