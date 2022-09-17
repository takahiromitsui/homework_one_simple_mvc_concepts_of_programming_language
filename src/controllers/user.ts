import { NextFunction, Request, Response } from 'express';
import { customLogger, WinstonLevel } from '../logger';
import { User } from '../models/user';

type ExpressRouteFunc = (
	req: Request,
	res: Response,
	next?: NextFunction
) => void | Promise<void>;

export const getDefault = (): ExpressRouteFunc => {
	return (req: Request, res: Response) => {
		res.render('add-user', { pageTitle: 'Add User', path: '/' });
	};
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

export const getUser = (users: User[]): ExpressRouteFunc => {
	return (req: Request, res: Response) => {
		const userID = req.params.id;
		const user = users.find(user => user.id === userID);
		if (!user) {
			customLogger(WinstonLevel.ERROR, 'User not exist');
			return res.redirect('/');
		}
		customLogger(WinstonLevel.INFO, 'User created');
		res.render('user', {
			pageTitle: 'User',
			path: '/user',
			username: user.name,
		});
	};
};
