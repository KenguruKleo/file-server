import express from "express";

const router = express.Router();

router.get('/ping', (req, res) => res.send('API pong\n'));

export default router;
