const StackHolder = require("../../src/db/Models/Stakeholder");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const stackholder = await StackHolder.find();

      res.render("admin/stakeholder/view_stakeholder", {
        alert,
        stackholder,
        name: req.session.admin.name,
        title: "Halaman Setting",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const stakeholder = await StackHolder.find();

      res.render("admin/stakeholder/create", {
        stakeholder,
        name: req.session.admin.name,
        title: "Halaman Tambah Stakeholder",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, stakeholder, jenis, jumlahDistribusi } = req.body;

      let stakeHolderData = await StackHolder({ name, stakeholder, jenis, jumlahDistribusi });
      await stakeHolderData.save();

      req.flash("alertMessage", "Berhasil Tambah Stakeholder");
      req.flash("alertStatus", "success");

      res.redirect("/stakeholder");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const stakeholder = await StackHolder.findOne({ _id: id });

      res.render("admin/stakeholder/edit", {
        stakeholder,
        name: req.session.admin.name,
        title: "Halaman Ubah StakeHolder",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, stakeholder, jenis, jumlahDistribusi } = req.body;

      await StackHolder.findOneAndUpdate(
        {
          _id: id,
        },
        { name, stakeholder, jenis, jumlahDistribusi }
      );

      req.flash("alertMessage", "Berhasil Ubah StakeHolder");
      req.flash("alertStatus", "success");

      res.redirect("/stakeholder");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await StackHolder.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil Hapus User");
      req.flash("alertStatus", "success");

      res.redirect("/stakeholder");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/stakeholder");
    }
  },
};
