import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function CalculateAge(Date: dob): string
{
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

