import express, {NextFunction, Request, Response} from "express";
import path from "path";
import { v1 as uuid } from 'uuid';

import API from './api';

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
const FILE_SERVER_API_KEY = process.env.FILE_SERVER_API_KEY || uuid();
app.set("FILE_SERVER_API_KEY", FILE_SERVER_API_KEY);

app.use(
	express.static(path.resolve(__dirname, "..", "data"), { maxAge: 31557600000 })
);

app.get('/ping', (req, res) => res.send('pong'));

const check_FILE_SERVER_API_KEY = (req: Request, res: Response, next: NextFunction) => {
	if (req.header('FILE_SERVER_API_KEY') !== FILE_SERVER_API_KEY) {
		res.status(401).send('Server requires valid FILE_SERVER_API_KEY');
		return;
	}
	next();
};

app.use('/api', check_FILE_SERVER_API_KEY, API);

export default app;
