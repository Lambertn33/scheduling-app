import { session, useSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req,res) =>{
    try {
        const { eventDate , from ,to ,eventTypeId , duration , user} = req.body
        const newBooking = await prisma.booking.create({
            data:{
                event_date:eventDate,
                from:from,
                to:to,
                duration:duration,
                event_type_id:eventTypeId,
                userId:user.id,
            }
        })
        //Everything done..
    
       res.status(200).send({status:200 , message:"New booking created successfully"})
    } catch (error) {
        throw error
    }
}