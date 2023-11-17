import { User } from "../../models/user.js";

export const dashboard = async (req, res) => {
  try {
    const departmentUsersTechnology = (await User.find()).filter(
      (x) => x.department == "Technology"
    );
    const departmentUsersMarketing = (await User.find()).filter(
      (x) => x.department == "Marketing"
    );
    const departmentUsersSales = (await User.find()).filter(
      (x) => x.department == "Sales"
    );
    const femaleUsers = (await User.find()).filter((x) => x.gender == "Female");
    const maleUsers = (await User.find()).filter((x) => x.gender == "Male");
    const users = await User.find();

    const qtdUsers = Object.keys(users).length;
    const qtdMaleUsers = Object.keys(maleUsers).length;
    const qtdFemaleUsers = Object.keys(femaleUsers).length;
    const qtdDepartmentUsersTechnology = Object.keys(
      departmentUsersTechnology
    ).length;
    const qtdDepartmentUsersMarketing = Object.keys(
      departmentUsersMarketing
    ).length;
    const qtdDepartmentUsersSales = Object.keys(departmentUsersSales).length;

    res.json({
      qtdUsers,
      qtdMaleUsers,
      qtdFemaleUsers,
      qtdDepartmentUsersMarketing,
      qtdDepartmentUsersSales,
      qtdDepartmentUsersTechnology,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
