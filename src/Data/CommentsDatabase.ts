import { CommentDTO } from '../Types';
import { BaseDatabase } from './BaseDatabase';

class FriendshipsDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Posts_Comments';

    async createComment({
        id,
        commentCreator,
        content,
        createdAt,
        postId,
    }: CommentDTO) {
        try {
            await this.getConnection()
                .insert({
                    id,
                    comment_creator: commentCreator,
                    content,
                    created_at: createdAt,
                    post_id: postId,
                })
                .from(FriendshipsDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new FriendshipsDatabase();
