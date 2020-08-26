import { Request, Response } from 'express';
import UserDatabase from '../Data/UserDatabase';
import Authenticator from '../Services/Authenticator';
import HashManager from '../Services/HashManager';
import IdGenerator from '../Services/IdGenerator';
import ParamChecker from '../Services/ParamChecker';
import User from '../Models/User';
import FriendshipsDatabase from '../Data/FriendshipsDatabase';

class Router {
    async signUp(req: Request, res: Response): Promise<void> {
        const { email, name, password } = req.body;
        try {
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

            const user = await UserDatabase.getUserByEmail({ email });

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

    async makeFriendship(req: Request, res: Response) {
        const { newFriendId } = req.body;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(newFriendId, authorization);

            const userId = Authenticator.getData(authorization as string);

            const targetUser = await UserDatabase.getUserById({
                id: newFriendId,
            });
            await UserDatabase.getUserById({ id: userId.id });

            const transactionId = IdGenerator.generateId();

            await FriendshipsDatabase.makeFriendship({
                transaction_id: transactionId,
                userId: userId.id,
                friendId: newFriendId,
            });

            res.status(201).send({
                message: `${targetUser.name} is now your friend`,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async undoFriendship(req: Request, res: Response) {
        const { friendId } = req.body;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(friendId, authorization);

            const userId = Authenticator.getData(authorization as string);

            const targetUser = await UserDatabase.getUserById({ id: friendId });
            await UserDatabase.getUserById({ id: userId.id });

            await FriendshipsDatabase.undoFriendship({
                userId: userId.id,
                friendId,
            });

            res.status(200).send({
                message: `${targetUser.name} is not your friend anymore`,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

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
