const HasilTanam = require("../../src/db/Models/HasilTanam");
const User = require("../../app/auth/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const hasilTanam = await HasilTanam.find();
      console.log(hasilTanam);

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

  viewCreate: async (req, res) => {
    try {
      const hasilTanam = await HasilTanam.find();
      const user = await User.find();


      res.render("admin/hasilTanam/create", {
        hasilTanam,
        user,
        name: req.session.admin.name,
        title: "Halaman Tambah Hasil Tanam",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name_user, jenis_tanaman, stock, harga } = req.body;

      let hasilTanam = await HasilTanam({ name_user, jenis_tanaman, stock, harga });
      await hasilTanam.save();

      req.flash("alertMessage", "Berhasil Tambah Hasil Tanam");
      req.flash("alertStatus", "success");

      res.redirect("/hasilTanam");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const hasilTanam = await HasilTanam.findOne({ _id: id });
      const users = await User.find();


      res.render("admin/hasilTanam/edit", {
        hasilTanam,
        users,
        name: req.session.admin.name,
        title: "Halaman Ubah Hasil Tanam",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name_user, jenis_tanaman, stock, harga } = req.body;

      await HasilTanam.findOneAndUpdate(
        {
          _id: id,
        },
        { name_user, jenis_tanaman, stock, harga }
      );

      req.flash("alertMessage", "Berhasil Ubah Hasil Tanam");
      req.flash("alertStatus", "success");

      res.redirect("/hasilTanam");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await HasilTanam.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil Hapus User");
      req.flash("alertStatus", "success");

      res.redirect("/hasilTanam");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/hasilTanam");
    }
  },
  
};
