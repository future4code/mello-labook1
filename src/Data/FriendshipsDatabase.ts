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
            .into(FriendshipsDatabase.TABLE_NAME);
    }
}

export default new FriendshipsDatabase();
