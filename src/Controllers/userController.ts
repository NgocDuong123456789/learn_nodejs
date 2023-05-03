import { deleteUserById, getUserById, getUsers } from '../db/users'
import express from 'express'

export const getAllUser=async(req: express.Request, res: express.Response)=>{
    try{
        
        const user= await getUsers()
        return res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        return res.status(400)
    }
}
export const deleteUser=async(req: express.Request, res: express.Response)=>{
    try{
        const {id}= req.params;
        const deleteUser = await deleteUserById(id);
        return res.status(200).json(deleteUser)
    }
    catch(error){
        
    }
}

export const updateUser=async(req: express.Request, res: express.Response)=>{
    try{
        const {id}=req.params;
        const {username}=req.body;
        if(!username) return res.status(403)
        const user= await getUserById(id)
        user.username= username;
        await user.save()
        return res.status(200).json(user).end()
    }
    catch(error){
        console.log(error)
        return res.status(400)
    }
}