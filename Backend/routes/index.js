// backend/routes/index.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { createUser, getUsers, deleteUser, patchUser } from '../controller/index.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('userimage');

router
    .post("/",upload, createUser)
    .get("/", getUsers)
    .delete("/:id", deleteUser)
    .patch("/:id",upload, patchUser);

export const UserRouter = router;