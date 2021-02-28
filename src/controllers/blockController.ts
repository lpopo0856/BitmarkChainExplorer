import { Request, Response } from 'express';
import blockService from "../services/blockService";
import blockValidator from "../validators/blockValidator";
import { Block } from '../entities/entities/Block'

class blockController {

    private blockService: blockService;
    private blockValidator: blockValidator;

    constructor() {
        this.blockService = new blockService();
        this.blockValidator = new blockValidator();
    }

    public async getAll(req: Request, res: Response) {
        try {
            const page_id = req.query.page_id ? Number(req.query.page_id as string) : null;
            let result: Block[] = this.blockValidator.getAll(page_id) ?
                await this.blockService.getBlocks(page_id) : null;
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const block_id = req.params.id;
            let result: Block = this.blockValidator.getOne(block_id) ?
                await this.blockService.getBlockWithBlockId(block_id) : null;
            return res.status(200).json(result ? result : {});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }
}

export default blockController