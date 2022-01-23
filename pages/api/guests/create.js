import prisma from "../../../lib/prisma";

export default async (req,res) =>{
    const { names , email , description , booking_id} = req.body
    //check empty fields

    if(!names || !email ||!description ){
        res.status(400).json({
            "message":"Please Fill All Fields",
        })
        return;
    }
    if(!booking_id){
        res.status(400).json({
            "message":"The Booking is missing",
        })
        return;
    }
    try {
        const newGuest = await prisma.guest.create({
            data:{
                names:names,
                email:email,
                description:description,
                booking_id:booking_id
            }
        })
        if(newGuest){
            res.status(200).json({ status: 200, message: "Guest Created successfully" });
        }
    } catch (error) {
        res.status(500).json({
            "message":error
        })
        return;
    }
} 