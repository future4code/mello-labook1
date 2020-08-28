import ParamConverter from '../Services/ParamConverter';
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
            const parsedDate = ParamConverter.dateToSQLStandard(
                createdAt as string
            );

            await this.getConnection()
                .insert({
                    id,
                    comment_creator: commentCreator,
                    content,
                    created_at: parsedDate,
                    post_id: postId,
                })
                .from(FriendshipsDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPostComments
}

export default new FriendshipsDatabase();
