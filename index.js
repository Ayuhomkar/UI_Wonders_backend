const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayushahomkar@gmail.com', // Replace with your email
        pass: 'fmls rbsy gxuo wbqh'   // Replace with your email password or an app-specific password
    }
});

app.post('/send-email', (req, res) => {
    const { email, subject, msg } = req.body;
    console.log(req.body)
    const mailOptions = {
        from: email,
        to: 'ayushahomkar@gmail.com',
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
