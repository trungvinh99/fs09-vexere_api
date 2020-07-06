const nodemailer = require('nodemailer');
const fs = require('fs');
const hogan = require('hogan.js')
const template = fs.readFileSync('service/email/bookingTicketEmailTemplate.hjs',"utf-8")
const compiledTemplate = hogan.compile(template)

module.exports.sendSuccessfulRegisterEmail= (ticket,trip,user)=>{
    const transport = {
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        requireTLS:true,
        requireSSL:true,
        auth:{
            user:"toiladevcybersoft@gmail.com",
            pass:"SuperDev123"
        }
    }
}
const transporter = nodemailer.createTransport(transport);
const mailOptions ={
    from:"toiladevcybersoft@gmail.com",
    to:"duongtrungvinh99@gmail.com",
    subject:"mua ve thanh cong",
    html:compiledTemplate.render({
        email:user.email,
        fromStation:`${trip.fromStation.name},${trip.fromStation.province}`,
        toStation:`${trip.toStation.name},${trip.toStation.province}`,
        price:trip.price,
        amount:ticket.seats.length,
        total:trip.price*ticket.seats.length,
        seatCodes:ticket.seats
        .map(n=>n.code)
        .join(", ")
    })
}
transporter.sendMail(mailOptions,(error)=>{
    if(error){
        return console.log(error.message)
    }
    console.log("success")
})