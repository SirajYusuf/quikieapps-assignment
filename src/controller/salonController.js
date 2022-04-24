const SalonModel = require("../models/salonModel");

const createSalon = async (req, res) => {
  try {
    const body = req.body;
    body.teamSize = body.employees.length
    let data = await new SalonModel(body).save();
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

const getSalons = async(req,res) =>{
    try {
        const query = req.query
        const data = await SalonModel.find({location:{ $regex : new RegExp(query.location, "i") }}).populate('employees')
        res.status(200).send({
            status:200,
            data,
            message:"Success!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:500,
            error,
            message:error.message
        })
    }
}


module.exports = {
  createSalon,
  getSalons
};
