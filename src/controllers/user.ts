import { ExpressConf } from '../confObj';
import { User } from '../models/user';

const users: User[] = [];

export const getDefault = (expressConf: ExpressConf) => {
	expressConf.res.render('add-user', { pageTitle: 'Add User', path: '/' });
};

export const postUser = (expressConf: ExpressConf) => {
	const username = expressConf.req.body.username;
	const id = new Date().toISOString();
	const newUser: User = {
		id: id,
		name: username,
	};
	users.push(newUser);
	expressConf.res.redirect(`/user/${id}`);
};

export const getUser = (expressConf: ExpressConf) => {
	const id = expressConf.req.params.id;
	const user = users.find(user => user.id === id);
	expressConf.res.render('user', {
		pageTitle: 'User',
		path: '/user',
		username: user?.name || '',
	});
};
