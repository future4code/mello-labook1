import { Request, Response } from 'express';

class Router {
    signUp(req: Request, res: Response) {}

    login(req: Request, res: Response) {}

    doFriendship(req: Request, res: Response) {}

    undoFriendship(req: Request, res: Response) {}

    createPost(req: Request, res: Response) {}

    getFeed(req: Request, res: Response) {}

    getFeedByyType(req: Request, res: Response) {}

    getFeedByPage(req: Request, res: Response) {}

    likePost(req: Request, res: Response) {}

    unlikePost(req: Request, res: Response) {}

    commentPost(req: Request, res: Response) {}

    refreshUserToken(req: Request, res: Response) {}
}

export default new Router();
