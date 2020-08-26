import { BaseDatabase } from './BaseDatabase';

class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Users';

    public async createUser(
        id: string,
        email: string,
        name: string,
        password: string
    ): Promise<void> {
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
            // SQL MESSAGE INCLUDES THE 'DUPLICATE ENTRY' SENTENCE WHEN
            // UNIQUE KEY EMAIL IS ATTEMPTED TO BE RECREATED WITH ALREADY EXISTENT VALUE
            if (error.message.includes('Duplicate entry'))
                throw new Error('This user already exists');
        }
    }
}

export default new UserDatabase();
