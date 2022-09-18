const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json());

var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "neilsabde@gmail.com",
    pass: "rsyxfsximzeijacc",
  },
  secure: true,
});

app.post("/send-mail", (req, res) => {
  const to = req.body.to;
  const name = req.body.name;
  const amount = req.body.amount;
  const date = req.body.date;
  const mailData = {
    from: "neilsabde@gmail.com",
    to: to,
    subject: "nodemailer-test",
    html: ` <p>
    Hello ${name},
</p>
<p>
    This is a reminder email that your payment of amount - ${amount} is due on date - ${date}
</p>
<p>
    Kindly make the payment before the due date to avoid any inconvenience.
</p>
<p>
    Thanks and Regards,
</p>`,
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).send({ message: "mail sent", message_id: info.messageId });
  });
});

server.listen(process.env.PORT || 8080);
