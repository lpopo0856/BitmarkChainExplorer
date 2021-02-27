import blockController from "../../controllers/blockController";
import { apiBaseRoute } from './apiBaseRoute';

export class blockRoutes extends apiBaseRoute {
    private blockController: blockController = new blockController();

    constructor() {
        super();
        this.setRoutes();
    }
    
    protected setRoutes() {

        this.router.route('/block')
            .get(this.blockController.getAll);

        this.router.route('/block/:id')
            .get(this.blockController.getOne);
    }
}