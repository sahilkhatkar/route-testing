import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'srv474936.hstgr.cloud',
    port: 465,
    secure: true,
    auth: {
        // user: 'mail@designindianhomes.com',
        // pass: 'Loginamd@321',
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD,
    },
});

export async function GET(request) {
    return NextResponse.json({ "status": "working" })
}

export async function POST(request) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    const number = formData.get('number')


    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            // from: 'official@designindianhomes.com', // sender address
            from: `"DesignIndianHomes" <${process.env.NODEMAILER_USER}>`, // sender address
            to: "sk2061899@gmail.com", // list of receivers
            subject: "Contact Form Details :-", // Subject line
            text: "Hello world?", // plain text body
            // html: "<b>Hi Sahil,</b>", // html body
            html: `
            <body>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #dddddd; padding: 8px;">E-mail</td>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${email}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; padding: 8px;">Message</td>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${message}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #dddddd; padding: 8px;">Contact</td>
                            <td style="border: 1px solid #dddddd; padding: 8px;">${number}</td>
                        </tr>
                    </tbody>
                </table>
            </body>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }
    try {
        let res = (await main()).messageId
        console.log("info: ", res)
        return NextResponse.json({ name, email, message, number, id: res })

    } catch (error) {
        console.log(error)
    }
    
    // console.log("Data: ", name, email, message, number)
    return NextResponse.json({ name, email, message, number })
}