import blockController from "../../controllers/blockController";
import { apiBaseRoute } from './apiBaseRoute';

export class blockRoutes extends apiBaseRoute {
    private blockController: blockController;

    constructor() {
        super();
        this.blockController = new blockController();
        this.setRoutes();
    }

    protected setRoutes() {

        this.router.route('/block')
            .get((req, res) => {
                this.blockController.getAll(req, res)
            });

        this.router.route('/block/:id')
            .get((req, res) => {
                this.blockController.getOne(req, res)
            });
    }
}