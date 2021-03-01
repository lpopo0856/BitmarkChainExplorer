import assetService from '../services/assetService'
import { Asset } from '../entities'

import typeorm = require('typeorm')

describe('assetService => getAssetWithAssetId', () => {
	it('getAssetWithAssetId method passed', async () => {
		const fakeQueryBuilder = jest.fn().mockResolvedValue('0x0')

		typeorm.getRepository = jest.fn().mockReturnValue({ findOne: fakeQueryBuilder })

		const result = await (new assetService()).getAssetWithAssetId('testId')

		expect(result).toEqual('0x0')

		const findOne = typeorm.getRepository(Asset).findOne
		expect(findOne).toHaveBeenNthCalledWith(1, { where: { assetId: 'testId' }})
	})
})