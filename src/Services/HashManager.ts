import bcrypt from 'bcryptjs';

class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        return bcrypt.hash(text, salt);
    }

    public async compare(text: string, hash: string): Promise<void> {
        const authenticated = await bcrypt.compare(text, hash);

        if (!authenticated) throw new Error('0001');
    }
}

export default new HashManager();
