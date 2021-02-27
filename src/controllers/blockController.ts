import { Request, Response } from 'express';
import * as blockService from "../services/blockService";
import { Block } from '../entities/entities/Block'

class blockController {

    public async getAll(req: Request, res: Response) {
        try {
            const page_id = req.query.page_id as string;
            const result: Block[] = await blockService.getAll(page_id)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result: Block = await blockService.getOne(id)
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }
}

export default blockController