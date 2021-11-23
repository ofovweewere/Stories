import express , {Request, Response, NextFunction} from 'express';
import * as DBConfig from '../Config/db';

export function rateIndex(req: Request): string
{
    let indexes = ["1","2","3","4","5","6"]
    let indexLength=0;
    if(req.body.hourlyRate ==="less than $50")
    {
        let user = req.user as TrainerDocument;
        return indexes[0];
    }

    else if (req.body.hourlyRate ==="$50-$100")
    {
        return indexes[1];
    }

    else if (req.body.hourlyRate ==="$100-$200")
    {
        return indexes[2];
    }

    else if (req.body.hourlyRate ==="$200-$300")
    {
        return indexes[1];
    }

    else if (req.body.hourlyRate ==="$300-$400")
    {
        return indexes[1];
    }

    else if (req.body.hourlyRate ==="$400-$500")
    {
        return indexes[1];
    }
    return req.hourlyRate;
}

