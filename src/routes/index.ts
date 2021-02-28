import BaseRoute from "./baseRoute"
import { blockRoutes } from "./api/blockRoute"
import { transactionRoutes } from "./api/transactionRoute"
import { assetRoutes } from "./api/assetRoute"

const router: Array<BaseRoute> = [
    new blockRoutes(),
    new transactionRoutes(),
    new assetRoutes(),
];

export default router;