import baseValidator from "./baseValidator";

class blockValidator extends baseValidator {

    public getAll(page_id) {
        return page_id === null || isNaN(page_id) ?
            this.throwParameterError('page_id is not valid') : true;
    }

    public getOne(block_id) {
        return block_id === null ?
            this.throwParameterError('block_id is required') : true;
    }
}

export default blockValidator