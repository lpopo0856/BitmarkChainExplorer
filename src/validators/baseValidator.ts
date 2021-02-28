class baseValidator {
    public throwParameterError(msg: string) {
        throw new Error(msg);
    }
}

export default baseValidator