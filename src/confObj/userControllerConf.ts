import { User } from '../models/user';

export interface UserControllerConf {
	users: User[];
	userID?: string;
}
