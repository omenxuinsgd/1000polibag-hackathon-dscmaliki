const HasilTanam = require("../../src/db/Models/HasilTanam");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const hasilTanam = await HasilTanam.find();

      res.render("admin/hasilTanam/view_hasilTanam", {
        alert,
        hasilTanam,
        name: req.session.admin.name,
        title: "Halaman User",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },
  
};
