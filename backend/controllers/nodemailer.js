"use strict";
const nodemailer = require("nodemailer");

async function main(req, res, next) {

  console.log('i`m the here')
  const {name, lastName, telephone, comment} = req.body
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'alexredmachine@mail.ru', // generated ethereal user
      pass: 'BcPwvxfyHacsj0JHi4u3', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'alexredmachine@mail.ru', // sender address
    to: "aezred2@yandex.ru", // list of receivers
    subject: "Заявка на запись ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
      <h1>Заявка на запись на приём</h1>
      <p>Имя заявителя: ${name}</p>
      <p>Фамилия заявителя: ${lastName}</p>
      <p>Телефон заявителя: ${telephone}</p>
      <p>Комментарий заявителя: ${comment}</p>
    `, // html body
  });

  res.send({message: 'email send'})
  
}

// main().catch(console.error);

module.exports = {main}