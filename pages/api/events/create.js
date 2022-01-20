import { useSession } from "next-auth/client";
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
                userId:"25f9c3b9-26f9-4f66-ad3b-f67a347372b6",
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
                userId:"25f9c3b9-26f9-4f66-ad3b-f67a347372b6",
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