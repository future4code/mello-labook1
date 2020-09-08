import jwt from 'jsonwebtoken';
import { AuthDTO } from '../Types';

class Authenticator {
    private static getExpiresIn(): number {
        return Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
    }
    public generateToken(data: AuthDTO): string {
        return jwt.sign(data, process.env.JWT_KEY as string, {
            expiresIn: Authenticator.getExpiresIn(),
        });
    }

    public getData(token: string): AuthDTO {
        try {
            const data = jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as any;
            return {
                id: data.id,
            };
        } catch (error) {
            throw new Error('Authentication is invalid or expired');
        }
    }

    public checkAuth(token: string): void {
        try {
            jwt.verify(token, process.env.JWT_KEY as string);
        } catch (error) {
            throw new Error('Authentication is invalid or expired');
        }
    }
}

export default new Authenticator();
