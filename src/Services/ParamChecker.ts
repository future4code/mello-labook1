class ParamChecker {
    public email(email: string): void {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(email)) {
            throw new Error('Invalid e-mail');
        }
    }

    public lenghtOf(
        parameterName: string,
        parameterToBeChecked: string,
        desirableLength: number
    ): void {
        if (parameterToBeChecked.length < desirableLength)
            throw new Error(
                `${parameterName} should be at least ${desirableLength} characters long`
            );
    }

    public existenceOf(...params: any[]): void {
        for (const param of params) {
            if (param === undefined) {
                throw new Error('One of the expected parameters is missing.');
            }
        }
    }
}

export default new ParamChecker();
