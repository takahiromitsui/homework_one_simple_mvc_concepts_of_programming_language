import { Router } from 'express';
import { User } from '../../models/user';

const router = Router();

const users: User[] = [];

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.post('/', (req, res) => {
	const name = req.body.name;
	const newUser: User = {
		id: new Date().toISOString(),
		name: name,
	};
	res.status(201).json({ message: 'User created', user: newUser });
});

export default router;
