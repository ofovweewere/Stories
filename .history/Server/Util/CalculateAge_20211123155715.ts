import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function CalculateAge(req: Request): string
{
    
    var diff_ms = Date.now() - req.body.birthDate.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970)+"";
}

