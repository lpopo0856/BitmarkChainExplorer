import baseValidator from "./baseValidator";

class transactionValidator extends baseValidator {
    public getOne(tx_id) {
        return tx_id === null ?
            this.throwParameterError('tx_id is required') : true;
    }
}

export default transactionValidator