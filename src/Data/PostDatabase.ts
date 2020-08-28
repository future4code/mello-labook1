import { BaseDatabase } from './BaseDatabase';
import { PostDTO, UserDTO } from '../Types/index';
import ParamConverter from '../Services/ParamConverter';

class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Posts';

    private async getPost({ id }: Pick<PostDTO, 'id'>): Promise<any> {
        const result = await this.getConnection()
            .select('*')
            .from(PostDatabase.TABLE_NAME)
            .where({ id });

        return result[0];
    }

    async createPost({
        id,
        photoURL,
        description,
        createdAt,
        type,
        creator,
    }: PostDTO): Promise<void> {
        try {
            const parsedDate = ParamConverter.dateToSQLStandard(
                createdAt as string
            );

            await this.getConnection()
                .insert({
                    id,
                    photo_url: photoURL,
                    description,
                    created_at: parsedDate,
                    creator,
                    type,
                })
                .into(PostDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error);
        }
    }

    async likePost({ id }: Pick<PostDTO, 'id'>): Promise<void> {
        try {
            const result = await this.getPost({ id });

            await this.getConnection()
                .into(PostDatabase.TABLE_NAME)
                .where({ id })
                .update({ likes: result.likes + 1 });
        } catch (error) {
            throw new Error(error);
        }
    }

    async dislikePost({ id }: Pick<PostDTO, 'id'>): Promise<void> {
        try {
            const result = await this.getPost({ id });

            await this.getConnection()
                .into(PostDatabase.TABLE_NAME)
                .where({ id })
                .update({ likes: result.likes - 1 });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getFeed({ id }: Pick<UserDTO, 'id'>): Promise<any> {}
}

export default new PostDatabase();
