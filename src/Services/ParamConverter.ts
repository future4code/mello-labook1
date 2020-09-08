class ParamConverter {
    public dateToSQLStandard(date: string): string {
        return date.split('/').reverse().join('/');
    }
}

export default new ParamConverter();
