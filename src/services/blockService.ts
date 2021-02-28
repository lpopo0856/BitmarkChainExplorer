import { Block } from "../entities/entities/Block";
import { getRepository } from "typeorm";

class blockService {
    public getBlockWithBlockId(block_id: string) {
        return getRepository(Block).findOne({ where: { blockHash: block_id },  relations: ['transactions']});
    }

    public getBlocks(page_id: number) {
        let qb = getRepository(Block).createQueryBuilder('Block');
        // 限定分頁每次十筆
        return qb
            .orderBy('block_number', 'DESC')
            .skip(10 * (Number(page_id) - 1))
            .take(10)
            .getMany();
    }
}
export default blockService