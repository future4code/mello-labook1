import { CommentDTO } from '../Types/index';

class Comments implements CommentDTO {
    constructor(
        public id: string,
        public commentCreator: string,
        public content: string,
        public createdAt: string,
        public postId: string
    ) {
        return this;
    }
}

export default Comments;
