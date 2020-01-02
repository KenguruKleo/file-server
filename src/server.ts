import dotenv from 'dotenv'
import errorHandler from "errorhandler";

dotenv.config();
const app = require('./app').default;

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
	console.log(
		"  App is running at PORT: %d in %s mode, FILE_SERVER_API_KEY=%s",
		app.get("port"),
		app.get("env"),
		app.get("FILE_SERVER_API_KEY"),
	);
	console.log("  Press CTRL-C to stop\n");
});

export default server;
