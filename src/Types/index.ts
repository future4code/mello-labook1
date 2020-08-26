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

export enum PostDTOEventType {
    EVENT = 'Evento',
    NORMAL = 'Normal',
}

export interface PostDTO {
    photoURL?: string;
    description: string;
    createdAt: Date | string;
    type: PostDTOEventType;
}
