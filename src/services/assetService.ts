import { Asset } from "../entities/entities/Asset";
import { getRepository } from "typeorm";

class assetnService {
    public getAssetWithAssetId(asset_id: string) {
        return getRepository(Asset).findOne({ where: { assetId: asset_id }});
    }
}
export default assetnService