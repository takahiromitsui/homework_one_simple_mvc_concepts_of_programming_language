import { NextFunction, Request, Response } from 'express';
import { customLogger, WinstonLevel } from '../logger';
import { User } from '../models/user';

const users: User[] = [];

type ExpressRouteFunc = (
	req: Request,
	res: Response,
	next?: NextFunction
) => void | Promise<void>;

export const getDefault = (req: Request, res: Response) => {
	res.render('add-user', { pageTitle: 'Add User', path: '/' });
};

export const postUser = (users: User[], userID: string): ExpressRouteFunc => {
	return (req: Request, res: Response) => {
		const username = req.body.username;
		const newUser: User = {
			id: userID,
			name: username,
		};
		users.push(newUser);
		res.redirect(`/user/${userID}`);
	};
};

// export const postUser = (req: Request, res: Response) => {
// 	const username = req.body.username;
// 	const id = new Date().toISOString();
// 	const newUser: User = {
// 		id: id,
// 		name: username,
// 	};
// 	users.push(newUser);
// 	res.redirect(`/user/${id}`);
// };

export const getUser = (req: Request, res: Response) => {
	const id = req.params.id;
	const user = users.find(user => user.id === id);
	if (!user) {
		customLogger(WinstonLevel.ERROR, 'User not exist');
		return res.redirect('/');
	}
	customLogger(WinstonLevel.INFO, 'User created');
	res.render('user', {
		pageTitle: 'User',
		path: '/user',
		username: user?.name || '',
	});
};
