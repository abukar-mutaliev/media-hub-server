const nodemailer = require("nodemailer");

class SendPartnerEmailController {
  async createPartnerEmail(req, res) {
    const {
      firstName,
      lastName,
      activity,
      achievements,
      networks,
      contactInfo,
      email,
    } = req.body;

    const emailContent = `
    <h3>Заявка на Партнерство</h3>
    <p><strong>Имя:</strong> ${firstName}</p>
    <p><strong>Фамилия:</strong> ${lastName}</p>
    <p><strong>Вид деятельности:</strong> ${activity}</p>
    <p><strong>Достижения:</strong> ${achievements}</p>
    <p><strong>Соцсети:</strong></p>
    <ul>
      ${networks
        .map(
          (network) =>
            `<li>${network.name}: ${network.followers} подписчиков</li>`
        )
        .join("")}
    </ul>
    <p><strong>Контактная информация:</strong> ${contactInfo}</p>
    <p><strong>Электронная почта:</strong> ${email}</p>
  `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abubakr.ingush@gmail.com",
        pass: "bhcy hlwv kpcs mwna",
      },
    });

    const mailOptions = {
      from: "abubakr.ingush@gmail.com",
      to: "abukar.mutaliev.js@gmail.com",
      subject: "Заявка на Партнерство",
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Ошибка:", error);
      res.status(500).json({ success: false, error: "Письмо не отправлено" });
    }
  }
}

module.exports = new SendPartnerEmailController();
