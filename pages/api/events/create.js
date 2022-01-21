import { session, useSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async(req , res)=>{
    try {
        const { title , url , description , minutes , user } = req.body;
        //Inputs validation
        if(!title || !url ||!description || !minutes){
            res.status(400).json({
                "message":"Please Fill All Fields"
            })
            return;
        }
        //make event title unique to a user
        const checkTitleForCurrentUser = await prisma.event.findFirst({
            where:{
                userId:user.id,
                AND:{
                    title:title
                }
            }
        })
        if(checkTitleForCurrentUser){
            res.status(400).json({
                "message":`Your already have an event titled ${title}`
            })
            return;
        }

        //new Event Type
        const newEvent = await prisma.event.create({
            data:{
                title:title,
                URL:url,
                description:description,
                userId:user.id,
                minutes:minutes
            }
        })
       
        //Everything done..
    
       res.status(200).send({status:200 , message:"New event created successfully"})
    } catch (error) {
        throw error
        res.status(500).json({
            "message":error
        })
        return;
    }
}