import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function rateIndex(req: Request): string
{
    int indexes = [1,2,3,4,5,6]
    if(req.hourly ==="less than 50")
    {
        let user = req.user as TrainerDocument;
        return indexes[0];
    }
    return '';
}

