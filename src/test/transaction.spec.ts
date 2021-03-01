import transactionService from '../services/transactionService'
import { Transaction } from '../entities'

import typeorm = require('typeorm')

describe('transactionService => getTransactionWithTxId', () => {
	it('getTransactionWithTxId method passed', async () => {
		const fakeQueryBuilder = jest.fn().mockResolvedValue('0x0')

		typeorm.getRepository = jest.fn().mockReturnValue({ findOne: fakeQueryBuilder })

		const result = await (new transactionService()).getTransactionWithTxId('testId')

		expect(result).toEqual('0x0')

		const findOne = typeorm.getRepository(Transaction).findOne
		expect(findOne).toHaveBeenNthCalledWith(1, { where: { txId: 'testId' } })
	})
})