import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

const users: User[] = [];

router.get('/', (req, res) => {
	res.render('add-user', { pageTitle: 'Add User', path: '/' });
});

router.post('/user', (req, res) => {
	const username = req.body.username;
	const id = new Date().toISOString();
	const newUser: User = {
		id: id,
		name: username,
	};
	users.push(newUser);
	res.redirect(`/user/${id}`);
});

router.get('/user/:id', (req, res) => {
	const id = req.params.id;
	const user = users.find(user => user.id === id);
	res.render('user', {
		pageTitle: 'User',
		path: '/user',
		username: user?.name || '',
	});
});

export default router;
