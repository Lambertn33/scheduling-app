import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'

export default async (req , res)=>{
    const { username , email , password  } = req.body
    //check empty fields

    if(!username || !email ||!password ){
        res.status(400).json({
            "message":"Please Fill All Fields",
        })
        return;
    }

    //check if username is hasn't ben used before
    const checkIfUserNameExists = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    if(checkIfUserNameExists){
        res.status(400).json({ status: 400, message: "User with such username already exists" });
        return;
    }
    //check if email is hasn't ben used before
    const checkIfUserEmailExists = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(checkIfUserEmailExists){
        res.status(400).json({ status: 400, message: "User with such email already exists" });
        return;
    }
    try {
        // save new user 
        const newUser = await prisma.user.create({
            data:{
                username:username,
                email:email,
                password: await bcrypt.hash(password , 8),
            }
        })
        if(newUser){
            res.status(200).json({ status: 200, message: "User Created successfully" });
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}