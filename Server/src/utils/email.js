import nodemailer from "nodemailer";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


async function sendMail(username,mail,teamName){
    const templateFile = fs.readFileSync(__dirname+`/template.html`, 'utf8');

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth :{
            user : "backslash_sc@thapar.edu", //Add BCS Gmail ID
            pass: "icxt gnnc xjpr eint" //BCS Gmail App password
        }
    }

    );

    //email content
    const mailOptions = {
        from:"backslash_sc@thapar.edu",
        to:mail,
        subject : `Get Ready ${username} of ${teamName}!`,
        // text:`${username} of team ${teamName}, looking forward to seeing your participation`,
        html: templateFile
    }

    try{
        const result = await transporter.sendMail(mailOptions);
        console.log("email sent successfully");
    }catch(err){
        // console.log("Email Failed to be sent");
        console.log(err);
    }
}

export default sendMail;
