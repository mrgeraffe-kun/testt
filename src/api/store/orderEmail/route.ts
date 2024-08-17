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
    const extractedItems = req.body["items"].map(item => ({
        quantity: item.quantity,
        name: item.title,
        subtotal: (item.subtotal/100).toFixed(2)
    }));
    let mailDetails =
        {
            "user": {
              "orderHistory": extractedItems
            },
            "username":req.body["name"],
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
          console.log(mailDetails);
        await sgMail.send({
            templateId: process.env.SENDGRID_ORDER_ID || "",
            from: process.env.SENDGRID_FROM || "",
            to: req.body["email"],
            dynamicTemplateData: mailDetails
        }).then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
          })
          .catch((error) => {
            console.error('Error sending test email');
            console.error(error);
            if (error.response) {
              console.error(error.response.body)
            }
          });
    res.json({ message: "Order email Sent" });
}
