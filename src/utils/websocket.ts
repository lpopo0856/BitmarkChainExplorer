import { Block } from "entities"
import { io } from "../server"
import blockService from "../services/blockService"

// store latest block
export let latestBlock: Block[] = []

// store sent latest block
let sentBlock: Block[] = []

export class webSocketUtil {
    private blockService: blockService

    constructor() {
        this.blockService = new blockService()
    }

    public async getLatestBlock() {
        latestBlock = await this.blockService.getBlocks(1)
        JSON.stringify(sentBlock) !== JSON.stringify(latestBlock) ? this.sendLatestBlock() : null
    }

    private sendLatestBlock() {
        io.emit('latestBlock', latestBlock)
        sentBlock = latestBlock
    }
}