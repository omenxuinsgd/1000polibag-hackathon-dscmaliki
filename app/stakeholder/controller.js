const req = require("express/lib/request");
const User = require("../../src/db/Models/Userr");
const Vegetable = require("../../src/db/Models/Setting");
const StackHolder = require("../../src/db/Models/Stakeholder");


module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const stackHolder = await StackHolder.find();

      res.render("admin/stakeholder/view_stakeholder", {
        alert,
        stackHolder,
        name: req.session.admin.name,
        title: "Halaman Setting",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const {id} = req.params;
      const { name, sum } = req.body;

      await User.findOneAndUpdate(
        {
          _id: id,
        },
        { name, sum }
      );

      req.flash("alertMessage", `Berhasil Edit Sayur ${name}`);
      req.flash("alertStatus", "success");

      res.redirect("/setting");

    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/setting");
    }
  },
};
