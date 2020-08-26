import { Request, Response } from 'express';
import UserDatabase from '../Data/UserDatabase';
import Authenticator from '../Services/Authenticator';
import HashManager from '../Services/HashManager';
import IdGenerator from '../Services/IdGenerator';
import ParamChecker from '../Services/ParamChecker';
import User from '../Models/User';

class Router {
    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const { email, name, password } = req.body;

            ParamChecker.existenceOf(name, email, password);
            ParamChecker.email(email);
            ParamChecker.lenghtOf('password', password, 6);

            const id = IdGenerator.generateId();

            const hashPassword = await HashManager.hash(password);

            await UserDatabase.createUser(
                new User(id, email, name, hashPassword)
            );

            const token = Authenticator.generateToken({ id });

            res.status(201).send({
                message: 'User created successfully',
                token,
            });
        } catch (error) {
            if (error.message === 'This user already exists') {
                res.status(409).send({
                    message: error.message,
                });
            } else {
                res.status(400).send({
                    message: error.message,
                });
            }
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            ParamChecker.existenceOf(email, password);

            const user = await UserDatabase.getUserByEmail(email);

            await HashManager.compare(password, user.password);

            const token = Authenticator.generateToken({ id: user.id });

            res.status(200).send({
                message: 'User logged successfully',
                token,
            });
        } catch (error) {
            if (error.message === 'NO MATCH') {
                res.status(401).send({
                    message: 'User or password is incorrect',
                });
            } else {
                res.status(400).send({
                    message: error.message,
                });
            }
        }
    }

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
