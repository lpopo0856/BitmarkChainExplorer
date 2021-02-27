import { Block } from "../entities/entities/Block";
import { getRepository } from "typeorm";

export function getOne(hash_id: string) {
    return getRepository(Block).findOneOrFail({ where: { blockHash: hash_id } });
}

export function getAll(page_id: string) {
    let qb = getRepository(Block).createQueryBuilder('Block');
    // 限定分頁每次十筆
    return qb
        .orderBy('block_number', 'DESC')
        .skip(10 * (Number(page_id) - 1))
        .take(10)
        .getMany();
}

