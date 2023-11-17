import { CourierClient } from "@trycourier/courier";
import dotenv from "dotenv";
import { User } from "../../models/user.js";
dotenv.config();

export const requestAccess = async (req, res) => {
  try {
    // Verifica se o email enviado já existe
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) throw new Error("User already exists!");

    // Seta o status do usuário como pendente, ou seja, para aprovação da IBM
    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      sexualIdentity: req.body.sexualIdentity,
      status: "Pending",
    };

    // Envia o novo usuário como em validação pelo pessoal da IBM
    await req.producer.send({
      topic: "new-user-minsky",
      messages: [{ value: JSON.stringify(newUser) }],
    });

    // Notifica o usuário de que o email foi enviado para aprovação
    const courier = CourierClient({
      authorizationToken: process.env.AUTHORIZATION_TOKEN_NOTIFICATION,
    });

    const { requestId } = await courier.send({
      message: {
        content: {
          title: "Pedido de acesso à plataforma Minsky",
          body: `Olá, ${newUser.firstName}. Seu requerimento de acesso foi enviado com sucesso, espere pacientemente até que o acesso seja liberado. Obrigado pela escolha!`,
        },
        to: {
          email: req.body.email,
        },
        channels: {
          email: {
            override: {
              from: "noreply@ibm.com",
            },
          },
        },
      },
    });

    // O trecho de código abaixo criaria um usuário, mas acredito que não precisamos para essa aplicação :)

    //   const user = new User(req.body);

    //   await user.save();

    res.status(200).send("Email enviado para aprovação!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  } finally {
    req.producer.disconnect();
  }
};
