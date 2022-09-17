import { Request, Response, NextFunction } from 'express';

export interface ExpressConf {
	req: Request;
	res: Response;
	next: NextFunction;
}
