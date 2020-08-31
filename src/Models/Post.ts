import { PostDTO } from '../Types/index';

class Post implements PostDTO {
    constructor(
        public id: string,
        public photoURL: string | null = null,
        public description: string,
        public createdAt: Date | string,
        public type: 'Normal' | 'Evento' = 'Normal',
        public creator: string,
        public likes: number = 0
    ) {
        return this;
    }
}

export default Post;
