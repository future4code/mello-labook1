import { Request, Response } from 'express';
import UserDatabase from '../Data/UserDatabase';
import Authenticator from '../Services/Authenticator';
import HashManager from '../Services/HashManager';
import IdGenerator from '../Services/IdGenerator';
import ParamChecker from '../Services/ParamChecker';
import User from '../Models/User';
import FriendshipsDatabase from '../Data/FriendshipsDatabase';
import PostDatabase from '../Data/PostDatabase';
import Post from '../Models/Post';

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
        const { newFriendId } = req.params;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(newFriendId);

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
        const { friendId } = req.params;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(friendId);

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

    async createPost(req: Request, res: Response) {
        const { photoURL, description, createdAt, type } = req.body;
        const { authorization } = req.headers;

        try {
            // Checks only required parameters
            ParamChecker.existenceOf(description, createdAt);
            ParamChecker.dateFormat(createdAt);

            const id = IdGenerator.generateId();

            const userId = Authenticator.getData(authorization as string);

            await PostDatabase.createPost(
                new Post(id, photoURL, description, createdAt, type, userId.id)
            );

            res.status(201).send({
                message: `Your post was successfully created`,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async likePost(req: Request, res: Response) {
        const { postId } = req.params;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(postId);

            Authenticator.checkAuth(authorization as string);

            await PostDatabase.likePost({ id: postId });

            res.status(200).send({
                message: `You liked this post`,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async dislikePost(req: Request, res: Response) {
        const { postId } = req.params;
        const { authorization } = req.headers;

        try {
            ParamChecker.existenceOf(postId);

            Authenticator.checkAuth(authorization as string);

            await PostDatabase.dislikePost({ id: postId });

            res.status(200).send({
                message: `You disliked this post`,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async getFeed(req: Request, res: Response) {
        const { authorization } = req.headers;

        try {
            const userId = Authenticator.getData(authorization as string);

            const feed = await PostDatabase.getFeed({ id: userId.id });

            res.status(200).send({
                result: feed,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async getFeedByType(req: Request, res: Response) {
        const { type } = req.query;
        const { authorization } = req.headers;

        try {
            const userId = Authenticator.getData(authorization as string);

            const feed = await PostDatabase.getFeedByType(
                userId.id,
                type as string
            );

            res.status(200).send({
                result: feed,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    }

    async getFeedByPage(req: Request, res: Response) {}

    async commentPost(req: Request, res: Response) {}

    async refreshUserToken(req: Request, res: Response) {}
}

export default new Router();
