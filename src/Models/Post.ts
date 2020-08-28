import { PostDTO } from '../Types/index';

class Post implements PostDTO {
    constructor(
        public id: string,
        public photoURL: string = 'none',
        public description: string,
        public createdAt: Date | string,
        public type: 'Normal' | 'Evento' = 'Normal',
        public likes: number = 0,
        public creator: string
    ) {
        return this;
    }
}

export default Post;
