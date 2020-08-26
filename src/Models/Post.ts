import { PostDTO, PostDTOEventType } from '../Types/index';

class Post implements PostDTO {
    constructor(
        public photoURL: string,
        public description: string,
        public createdAt: Date | string,
        public type: PostDTOEventType = PostDTOEventType.NORMAL
    ) {
        return this;
    }
}

export default Post;
