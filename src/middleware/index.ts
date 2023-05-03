import express from 'express'
import {get , merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'


export const isAuthenticated=async(req: express.Request, res: express.Response, next:express.NextFunction) => {
    try{
        const sessionToken= req.cookies['Antonio-auth'];
        if(!sessionToken) return res.status(403);
        const existingUser= await getUserBySessionToken(sessionToken)

        if(!existingUser) return res.status(403);
       const mer= merge(req ,{identity: existingUser})
       console.log(mer);
        return next()
    }
    catch(err){
        console.log(err)
        return res.status(400);
    }
}
export const isOwner=async(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        const {id}= req.params;
        const  currentUserId= get(req,'identity._id') as string
        if(!currentUserId) return res.status(403)
        if(currentUserId.toString() !== id ) return res.status(403)
        return next()
    }
    catch(error){

    }

}