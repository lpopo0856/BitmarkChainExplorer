import { Request, Response } from 'express';
import assetValidator from "../validators/assetValidator";
import assetService from "../services/assetService";
import { Asset } from '../entities/entities/Asset'

class assetController {

    private assetService: assetService;
    private assetValidator: assetValidator;

    constructor() {
        this.assetService = new assetService();
        this.assetValidator = new assetValidator();
    }

    public async getOne(req: Request, res: Response) {
        try {
            const asset_id = req.params.id ? req.params.id : null;
            let result: Asset = this.assetValidator.getOne(asset_id) ?
                await this.assetService.getAssetWithAssetId(asset_id) : null;
            return res.status(200).json(result ? result : {});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }
}

export default assetController