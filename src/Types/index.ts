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
    transaction_id: string;
    userId: string;
    friendId: string;
}

export interface PostDTO {
    id: string;
    photoURL: string | null;
    description: string;
    likes: number;
    createdAt: Date | string;
    type: 'Evento' | 'Normal';
    creator: string;
}

export interface CommentDTO {
    id: string;
    commentCreator: string;
    content: string;
    createdAt: Date | string;
    postId: string;
}
