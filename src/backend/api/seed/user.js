import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

// Data array containing seed data - documents organized by Model
var data = [
  {
    firstName: "Albert",
    lastName: "Mendez",
    email: "albert.mendez@ibm.com",
    password: "12345678",
    department: "Sales",
    gender: "Male",
    sexualIdentity: "Straight",
    status: "Created",
    admin: true,
  },
  {
    firstName: "Mary",
    lastName: "Jane",
    email: "mary.jane@ibm.com",
    password: "12345678",
    department: "Technology",
    gender: "Female",
    sexualIdentity: "Bissexual",
    status: "Created",
    admin: true,
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "jonh.doe@ibm.com",
    password: "12345678",
    department: "Marketing",
    gender: "Male",
    sexualIdentity: "Homossexual",
    status: "Created",
    admin: false,
  },
];

const addUser = async () => {
  for (let i in data) {
    try {
      const user = new User(data[i]);
      await user.save();
      console.log("Usuário adicionado ao banco de dados");
    } catch (err) {
      console.log(err);
    }
  }
};

addUser();
