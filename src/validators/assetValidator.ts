import baseValidator from "./baseValidator";

class assetValidator extends baseValidator {
    public getOne(asset_id) {
        return asset_id === null ?
            this.throwParameterError('asset_id is required') : true;
    }
}

export default assetValidator