import dotenv from 'dotenv'
dotenv.config()
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa"

export const GET = (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    res.json({
        message: "[GET] Hello world!",
    })
}

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    let mailDetails =
        {
            "user": {
              "orderHistory": req.body["items"]
            },
            "name":req.body["name"],
            "address": req.body["address"],
            "deliverymethod": "Standard",
            "paymentMode": "Online",
            "email": req.body["email"],
            "orderId": req.body["orderId"],
            "tax": req.body["tax"],
            "shipping": req.body["shipping"],
            "total": req.body["total"],
            "date": req.body["date"]
          }
          console.log(mailDetails, "HERE");
        await sgMail.send({
            templateId: process.env.SENDGRID_ORDER_ID || "",
            from: process.env.SENDGRID_FROM || "",
            to: req.body["email"],
            dynamicTemplateData: mailDetails
        });
    res.json({ message: "Order email Sent" });
}
