import express from 'express';
import Router from './Controllers/Router';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routes();
    }

    public routes() {
        this.app.use(express.json());
        this.app.route('/signup').post(Router.signUp);
        this.app.route('/login').post(Router.login);
        this.app.route('/users/:newFriendId/add').put(Router.makeFriendship);
        this.app.route('/users/:friendId/remove').put(Router.undoFriendship);
        this.app.route('/posts/create').post(Router.createPost);
        this.app.route('/posts/:postId/like').patch(Router.likePost);
        this.app.route('/posts/:postId/dislike').patch(Router.dislikePost);
        this.app.route('/posts/:postId/comment').post(Router.commentPost);
        this.app.route('/feed').get(Router.getFeed);
        this.app.route('/feed/show').get(Router.getFeedByType);
    }
}

export default new Server();
