import express from 'express';
import { getNotes, createNote, getNote } from "../controllers/notesController"

const router = express.Router();

router.get('/', getNotes);

router.get('/:id', getNote)

router.post('/', createNote);

export default router;