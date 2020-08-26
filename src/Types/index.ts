export interface AuthDTO {
    id: string;
}

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    password: string;
}

export interface FriendShipTransactionsDTO {
    transaction_id?: string;
    userId: string;
    friendId: string;
}
