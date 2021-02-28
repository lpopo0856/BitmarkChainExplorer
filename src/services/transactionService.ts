import { Transaction } from "../entities/entities/Transaction";
import { getRepository } from "typeorm";

class transactionService {
    public getTransactionWithTxId(tx_id: string) {
        return getRepository(Transaction).findOne({ where: { txId: tx_id }});
    }
}
export default transactionService