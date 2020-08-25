import { Request, Response } from 'express';
import Authenticator from '../Services/Authenticator';
import HashManager from '../Services/HashManager';
import IdGenerator from '../Services/IdGenerator';
import ParamChecker from '../Services/ParamChecker';

class Router {
    async signUp(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;

            ParamChecker.existenceOf(name, email, password);
            ParamChecker.email(email);
            ParamChecker.lenghtOf('password', password, 6);

            const id = IdGenerator.generateId();

            const hashPassword = await HashManager.hash(password);

            //await UserDatabase.createUser(id, email, name, hashPassword);

            const token = Authenticator.generateToken({ id });

            res.status(201).send({
                message: 'User created successfully',
                token,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async login(req: Request, res: Response) {}

    async doFriendship(req: Request, res: Response) {}

    async undoFriendship(req: Request, res: Response) {}

    async createPost(req: Request, res: Response) {}

    async getFeed(req: Request, res: Response) {}

    async getFeedByyType(req: Request, res: Response) {}

    async getFeedByPage(req: Request, res: Response) {}

    async likePost(req: Request, res: Response) {}

    async unlikePost(req: Request, res: Response) {}

    async commentPost(req: Request, res: Response) {}

    async refreshUserToken(req: Request, res: Response) {}
}

export default new Router();
