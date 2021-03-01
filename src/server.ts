import app from "./app"
import config from "./config/ormConfig"

(new app(config)).app.listen(3000, () => {
    console.log('Express server listening on Port ', 3000);
})