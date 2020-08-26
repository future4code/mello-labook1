import { BaseDatabase } from './BaseDatabase';
import { FriendShipTransactionsDTO } from '../Types/index';

class FriendshipsDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Friendships';

    async makeFriendship({
        transaction_id,
        userId,
        friendId,
    }: FriendShipTransactionsDTO): Promise<void> {
        await this.getConnection()
            .insert({
                transaction_id,
                user1: userId,
                user2: friendId,
            })
            .from(FriendshipsDatabase.TABLE_NAME);
    }

    async undoFriendship({
        userId,
        friendId,
    }: FriendShipTransactionsDTO): Promise<void> {
        await this.getConnection()
            .delete()
            .from(FriendshipsDatabase.TABLE_NAME)
            .where({
                user1: userId,
                user2: friendId,
            });
    }
}

export default new FriendshipsDatabase();
