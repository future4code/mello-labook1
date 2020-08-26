import { UserDTO } from '../Types';
import { BaseDatabase } from './BaseDatabase';

class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Users';

    public async createUser({
        id,
        email,
        name,
        password,
    }: UserDTO): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    email,
                    name,
                    password,
                })
                .into(UserDatabase.TABLE_NAME);
        } catch (error) {
            if (error.message.includes('Duplicate entry'))
                throw new Error('This user already exists');
        }
    }

    public async getUserByEmail({ email }: Partial<UserDTO>) {
        try {
            const result = await this.getConnection()
                .select('*')
                .from(UserDatabase.TABLE_NAME)
                .where({ email });

            if (result[0] === undefined) {
                throw new Error('This user does not exist');
            } else {
                return result[0];
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new UserDatabase();
