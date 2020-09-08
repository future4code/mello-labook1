import { UserDTO } from '../Types/index';

class User implements UserDTO {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public password: string
    ) {
        return this;
    }
}

export default User;
