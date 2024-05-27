const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'piyoush.jaiswal06@gmail.com',
        pass: 'moyb xuup fcag citg'
    }
});

// Handle POST request to /send
app.post('/send', (req, res) => {
    const { name, email, concern, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'piyoush.jaiswal06@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nConcern: ${concern}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Your Message sent successfully to Piyoush!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
