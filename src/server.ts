import dotenv from 'dotenv'
import errorHandler from "errorhandler";
import { globalAgent } from "http";

dotenv.config();
// eslint-disable-next-line import/no-commonjs
const app = require('./app').default;

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

globalAgent.maxSockets = 50;

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
