import { PostDTO } from '../Types/index';

class Post implements PostDTO {
    constructor(
        public photoURL: string = 'none',
        public description: string,
        public createdAt: Date | string,
        public type: 'Normal' | 'Evento' = 'Normal'
    ) {
        return this;
    }
}

export default Post;
