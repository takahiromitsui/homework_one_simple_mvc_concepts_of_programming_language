import { Request, Response } from 'express';
import { User } from '../models/user';

const users: User[] = [];

export const getDefault = (req: Request, res: Response) => {
	res.render('add-user', { pageTitle: 'Add User', path: '/' });
};

export const postUser = (req: Request, res: Response) => {
	const username = req.body.username;
	const id = new Date().toISOString();
	const newUser: User = {
		id: id,
		name: username,
	};
	users.push(newUser);
	res.redirect(`/user/${id}`);
};

export const getUser = (req: Request, res: Response) => {
	const id = req.params.id;
	const user = users.find(user => user.id === id);
	res.render('user', {
		pageTitle: 'User',
		path: '/user',
		username: user?.name || '',
	});
};
