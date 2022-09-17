import { NextFunction, Request, Response } from 'express';
import { UserControllerConf } from '../confObj/userControllerConf';
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

export const postUser = (
	userControllerConf: UserControllerConf
): ExpressRouteFunc => {
	return (req: Request, res: Response) => {
		const username = req.body.username;
		if (!userControllerConf.userID) {
			customLogger(WinstonLevel.ERROR, 'Missing args');
			return res.redirect('/');
		}
		const newUser: User = {
			id: userControllerConf.userID,
			name: username,
		};
		userControllerConf.users.push(newUser);
		res.redirect(`/user/${userControllerConf.userID}`);
	};
};

export const getUser = (
	userControllerConf: UserControllerConf
): ExpressRouteFunc => {
	return (req: Request, res: Response) => {
		const userID = req.params.id;
		const user = userControllerConf.users.find(user => user.id === userID);
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
