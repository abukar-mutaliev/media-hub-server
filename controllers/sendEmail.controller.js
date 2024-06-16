const nodemailer = require("nodemailer");

class SendEmailController {
  async createEmail(req, res) {
    const {
      name,
      activity,
      networks,
      contactInfo,
      comments,
      adDetails,
      otherAd,
    } = req.body;

    const emailContent = `
      <h3>Заказ рекламы</h3>
      <p><strong>Имя знаменитости:</strong> ${name}</p>
      <p><strong>Вид деятельности:</strong> ${activity}</p>
      <p><strong>Соцсети знаменитости:</strong></p>
      <ul>
        ${networks
          .map(
            (network) =>
              `<li>${network.network_name}: ${network.followers} подписчиков</li>`
          )
          .join("")}
      </ul>
      <p><strong>ФИО Заказчика:</strong> ${comments}</p>
      <p><strong>Контактная информация заказчика:</strong> ${contactInfo}</p>
      <p><strong>Выбранная реклама:</strong></p>
      <ul>
        ${adDetails
          .map((ad) => `<li>${ad.type.replace(/_/g, " ")} - ${ad.price}₽</li>`)
          .join("")}
      </ul>
      ${
        otherAd ? `<p><strong>Расширенная реклама:</strong> ${otherAd}</p>` : ""
      }
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
      subject: "Заказ рекламы",
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Письмо отправлено" });
    } catch (error) {
      console.error("Ошибка:", error);
      res.status(500).json({ error: "Письмо не отправлено" });
    }
  }
}

module.exports = new SendEmailController();
