import { Request, Response } from 'express';
import transactionService from "../services/transactionService";
import transactionValidator from "../validators/transactionValidator";
import { Transaction } from '../entities/entities/Transaction'

class transactionController {

    private transactionService: transactionService;
    private transactionValidator: transactionValidator;

    constructor() {
        this.transactionService = new transactionService();
        this.transactionValidator = new transactionValidator();
    }

    public async getOne(req: Request, res: Response) {
        try {
            const tx_id = req.params.id;
            let result: Transaction = this.transactionValidator.getOne(tx_id) ?
                await this.transactionService.getTransactionWithTxId(tx_id) : null;
            return res.status(200).json(result ? result : {});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }
}

export default transactionController