import { BaseDatabase } from './BaseDatabase';
import { FriendShipTransactionsDTO } from '../Types/index';

class FriendshipsDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Friendships';

    private async checkFriendShipExistence({
        userId,
        friendId,
    }: Omit<FriendShipTransactionsDTO, 'transaction_id'>): Promise<boolean> {
        try {
            const result = await this.getConnection()
                .select('user1', 'user2')
                .from(FriendshipsDatabase.TABLE_NAME)
                .where({
                    user1: userId,
                    user2: friendId,
                });

            if (result[0]) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    public async makeFriendship({
        transaction_id,
        userId,
        friendId,
    }: FriendShipTransactionsDTO): Promise<void> {
        try {
            if (await this.checkFriendShipExistence({ userId, friendId })) {
                throw 'You are a friend of this user already';
            }

            await this.getConnection()
                .insert({
                    transaction_id,
                    user1: userId,
                    user2: friendId,
                })
                .from(FriendshipsDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async undoFriendship({
        userId,
        friendId,
    }: Omit<FriendShipTransactionsDTO, 'transaction_id'>): Promise<void> {
        try {
            if (!(await this.checkFriendShipExistence({ userId, friendId }))) {
                throw 'You are not a friend of this user already';
            }

            await this.getConnection()
                .delete()
                .from(FriendshipsDatabase.TABLE_NAME)
                .where({
                    user1: userId,
                    user2: friendId,
                });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new FriendshipsDatabase();
