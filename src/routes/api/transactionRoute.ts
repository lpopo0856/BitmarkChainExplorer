import transactionController from "../../controllers/transactionController";
import { apiBaseRoute } from './apiBaseRoute';

export class transactionRoutes extends apiBaseRoute {
    private transactionController: transactionController;

    constructor() {
        super();
        this.transactionController = new transactionController();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.route('/transaction/:id')
            .get((req, res) => {
                this.transactionController.getOne(req, res)
            });
    }
}