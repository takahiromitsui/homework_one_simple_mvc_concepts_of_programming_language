import { Router } from 'express';
import path from 'path';
import { User } from '../models/user';

const router = Router();

const users: User[] = [];

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../src/', 'views', 'add-user.html'));
});

router.post('/', (req, res) => {
	const username = req.body.username;
	const newUser: User = {
		id: new Date().toISOString(),
		name: username,
	};
	users.push(newUser);
	res.status(201).json({ message: 'User created', user: newUser });
});

export default router;
