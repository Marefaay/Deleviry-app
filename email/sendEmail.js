const sendEmail = async (request, response) => {
    const transporter = nodemailer.createTransport({
      service:"gmail",
        auth: {
          user: "mrefaay271@gmail.com",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
};
module.exports = sendEmail;
