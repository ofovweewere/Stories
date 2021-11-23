import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function TrainerDisplayName(req: Request): string
{
    int indexes = [1,2,3,4,5,6]
    if(req.hourly ==="less than 50")
    {
        let user = req.user as TrainerDocument;
        return indexes[0];
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}