import express from 'express';
import { getNotes } from "../controllers/notesController"

const router = express.Router();

router.get('/', getNotes);

export default router;