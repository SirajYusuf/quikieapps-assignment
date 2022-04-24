const EmployeeModel = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    let data = await new EmployeeModel(body).save();
    console.log(data)
    res.status(200).send({
      data,
      message: "Success!"
    });
  } catch (error) {
      console.log(error)
      res.status(500).send({
          status:500,
          error,
          message:error.message
      })
  }
};


module.exports = {
  createEmployee,
};
