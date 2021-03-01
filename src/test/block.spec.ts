import blockService from '../services/blockService'
import { Block } from '../entities'

import typeorm = require('typeorm')

describe('blockService => getBlocks', () => {
	it('getBlocks method passed', async () => {
		const fakeQueryBuilder = jest.fn().mockReturnValue({
			orderBy: jest.fn().mockReturnThis(),
			skip: jest.fn().mockReturnThis(),
			take: jest.fn().mockReturnThis(),
			getMany: jest.fn().mockResolvedValue('0x0')
		})

		typeorm.getRepository = jest.fn().mockReturnValue({ createQueryBuilder: fakeQueryBuilder })

		const result = await (new blockService()).getBlocks(1)

		expect(result).toEqual('0x0')

		const queryBuilder = typeorm.getRepository(Block).createQueryBuilder
		expect(queryBuilder().orderBy).toHaveBeenNthCalledWith(1, "block_number", 'DESC')
		expect(queryBuilder().skip).toHaveBeenNthCalledWith(1, 0)
		expect(queryBuilder().take).toHaveBeenNthCalledWith(1, 100)
		expect(queryBuilder().getMany).toHaveBeenNthCalledWith(1)
	})
})

describe('blockService => getBlockWithBlockId', () => {
	it('getBlockWithBlockId method passed', async () => {
		const fakeQueryBuilder = jest.fn().mockResolvedValue('0x0')

		typeorm.getRepository = jest.fn().mockReturnValue({ findOne: fakeQueryBuilder })

		const result = await (new blockService()).getBlockWithBlockId('testId')

		expect(result).toEqual('0x0')

		const findOne = typeorm.getRepository(Block).findOne
		expect(findOne).toHaveBeenNthCalledWith(1, { where: { blockHash: 'testId' }, relations: ['transactions'] })
	})
})