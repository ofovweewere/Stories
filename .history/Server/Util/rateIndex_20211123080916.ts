import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function rateIndex(req: Request): string
{
    let indexes = ["1","2","3","4","5","6"]
    if(req.hourlyRate ==="less than $50")
    {
        let user = req.user as TrainerDocument;
        return "jogn whats good";
    }
    return "hey there";
}

