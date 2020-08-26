import { BaseDatabase } from './BaseDatabase';

class FriendshipsDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Friendships';

    async makeFriendship(
        transaction_id: string,
        userId: string,
        newFriendId: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                transaction_id,
                user1: userId,
                user2: newFriendId,
            })
            .from(FriendshipsDatabase.TABLE_NAME)
            .where({
                user1: userId,
                user2: newFriendId,
            });
    }

    async undoFriendship(userId: string, friendId: string): Promise<void> {
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
