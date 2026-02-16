import { Request } from 'express';
import { User } from '../../modules/database/entities/user.entity';

export interface RequestInterface extends Request {
	user: User | null;
}
