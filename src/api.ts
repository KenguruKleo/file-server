import express, { Application } from "express";
import multer from 'multer';
import path from 'path';

const limits = {
	fileSize: 10e6, // 10 Mb
	files: 10,
};

const API = (app: Application) => {
	const router = express.Router();
	const DATA_FOLDER = app.get("DATA_FOLDER");

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, DATA_FOLDER);
		},

		// By default, multer removes file extensions so let's add them back
		filename: (req, file, cb) => {
			cb(null, 'file_' + Date.now() + path.extname(file.originalname));
		}
	});

	router.get(
		'/ping',
		(req, res) => res.send('API pong\n')
	);

	router.post(
		'/file',
		(req, res) => {
			let upload = multer(
				{
					storage: storage,
					limits,
				}).single('data');

			upload(req, res, err => {
				// req.file contains information of uploaded file
				// req.body contains information of text fields, if there were any
				if (!req.file) {
					return res.send('Please select an image to upload');
				}
				else if (err) {
					return res.send(err);
				}

				// Display uploaded image for user validation
				res.send(req.file.filename);
			});
		}
	);

	router.post(
		'/files',
		(req, res) => {
			let upload = multer(
				{
					storage: storage,
					limits,
				}).array('data', limits.files);

			upload(req, res, err => {
				// req.file contains information of uploaded file
				// req.body contains information of text fields, if there were any
				if (req.files.length === 0) {
					return res.send('Please select an image to upload');
				}
				else if (err) {
					return res.send(err);
				}
				// const uploadedNames = [];
				// for (let index = 0, len = req.files.length; index < len; ++index) {
				// 	uploadedNames.push(req.files[index].filename);
				// }

				// @ts-ignore
				const uploadedNames = req.files.map(file => file.filename);
				// Display uploaded image for user validation
				res.send(uploadedNames);
			});
		}
	);

	return router;
};

export default API;
