import { BaseDatabase } from './BaseDatabase';
import { PostDTO, UserDTO } from '../Types/index';
import ParamConverter from '../Services/ParamConverter';
import Post from '../Models/Post';

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

    async getFeed({ id }: Pick<UserDTO, 'id'>): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT 
                
                P.id as postId, P.photo_url as photoUrl,
                P.description, P.created_at as createdAt,
                P.type,
                
                U.name as username, U.id as userId 

                FROM Posts P

                JOIN Users U ON P.creator = U.id

                JOIN Friendships F ON F.user2 = U.id

                WHERE F.user1 = "${id}" 

                ORDER BY P.created_at DESC
                `);

            return result[0].map((item: any) => {
                const post = new Post(
                    item.postId,
                    item.photoUrl,
                    item.description,
                    item.createdAt,
                    item.type,
                    item.creator
                );

                const data = {
                    post,
                    username: item.username,
                    userID: item.userId,
                    // implement comments
                };

                return data;
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getFeedByType(UserId: string, type: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT
                
                P.id as postId, P.photo_url as photoUrl, P.description,
                P.created_at as createdAt, P.type, U.name as username, U.id as userId
                
                FROM
                
                Posts P
                
                JOIN
                
                Users U ON P.creator = U.id
                
                WHERE

                P.type = "${type}" ORDER BY P.created_at DESC`);

            return result[0].map((item: any) => {
                const post = new Post(
                    item.postId,
                    item.photoUrl,
                    item.description,
                    item.createdAt,
                    item.type,
                    item.creator
                );

                const data = {
                    post,
                    username: item.username,
                    userID: item.userId,
                    // implement comments
                };

                return data;
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new PostDatabase();
