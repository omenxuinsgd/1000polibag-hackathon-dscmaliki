

const Vegetable = require("../../src/db/Models/Setting");
const Stakeholder = require("../../src/db/Models/Stakeholder");

const User = require("../../app/auth/model");

module.exports = {
  index: async (req, res) => {
    try {      
      const vegetable1 = await Vegetable.findById("62772ed88e95ab077ed764a3");
      const vegetable2 = await Vegetable.findById("62787d4f9f1c9d93d46815cd");
      const user = await User.countDocuments();
      console.log("userrrrrrr:",user);

      
      const countPlastik = await Stakeholder.find({});
      const countMasker = await Stakeholder.find({});

      console.log("PLASTIKKKKKKK:",countPlastik);
      console.log("PLASTIKKKKKKK:",countMasker);

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      res.render("admin/dashboard/view_dashboard",{
        name : req.session.admin.name,
        title: "Halaman Dashboard",
        count: {
          user
        },
        vegetable1,
        countPlastik,
        countMasker,
        vegetable2,
        user,
        alert
      });
    } catch (err) {
      console.log(err);
    }
  },

  };
