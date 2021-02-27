import BaseRoute from "./baseRoute"
import { blockRoutes } from "./api/blockRoute"

const router: Array<BaseRoute> = [
    new blockRoutes()
];

export default router;