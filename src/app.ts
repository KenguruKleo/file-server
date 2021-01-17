import express, {NextFunction, Request, Response, Application} from "express";
import path from "path";
import { v1 as uuid } from "uuid";
import API from "./api";

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
const FILE_SERVER_API_KEY = process.env.FILE_SERVER_API_KEY || uuid();
app.set("FILE_SERVER_API_KEY", FILE_SERVER_API_KEY);
const DATA_FOLDER = path.resolve(__dirname, "..", "data");
app.set("DATA_FOLDER", DATA_FOLDER);

app.use(
	'/data',
	express.static(DATA_FOLDER, { maxAge: 31557600000 })
);

app.get('/ping', (req, res) => res.send('pong'));

const check_FILE_SERVER_API_KEY = (req: Request, res: Response, next: NextFunction) => {
	if (req.header('FILE_SERVER_API_KEY') !== FILE_SERVER_API_KEY) {
		res.status(401).send('Server requires valid FILE_SERVER_API_KEY');
		return;
	}
	next();
};

app.use('/api', check_FILE_SERVER_API_KEY, API(app));

export default app;
