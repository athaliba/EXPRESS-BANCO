import express from 'express';
import exampleController from '../controller/example.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

router.get('/', verifyToken, exampleController.securedExampleProcess);
router.get("/protected", verifyToken, (req, res) => {
    res.status(200).send({ message: "Protected route accessed successfully" });
})

export default router;