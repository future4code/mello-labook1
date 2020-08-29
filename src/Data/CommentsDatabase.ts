import ParamConverter from '../Services/ParamConverter';
import { CommentDTO, PostDTO } from '../Types';
import { BaseDatabase } from './BaseDatabase';

class CommentsDatabase extends BaseDatabase {
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
                .from(CommentsDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPostComments({ id }: Pick<PostDTO, 'id'>) {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(CommentsDatabase.TABLE_NAME)
                .where({ post_id: id });

                
            
            return result[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new CommentsDatabase();
