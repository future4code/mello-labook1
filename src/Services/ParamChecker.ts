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
            if (param === undefined || param === null) {
                throw new Error('One of the expected parameters is missing.');
            }
        }
    }

    public dateFormat(date: string) {
        const dateFormatRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

        if (!dateFormatRegex.test(date)) {
            throw new Error('Date parameter should be in DD/MM/YYYY format');
        }
    }
}

export default new ParamChecker();
