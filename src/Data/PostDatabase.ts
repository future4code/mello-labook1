import { BaseDatabase } from './BaseDatabase';
import { PostDTO } from '../Types/index';
import ParamConverter from '../Services/ParamConverter';

class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Posts';

    async createPost({
        id,
        photoURL,
        description,
        createdAt,
        type,
        creator,
    }: PostDTO) {
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
}

export default new PostDatabase();
