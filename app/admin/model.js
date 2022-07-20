const mongoose = require("mongoose");

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let adminSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email Pembayaran Harus Diisi"],
  },
  name: {
    type: String,
    require: [true, "Email Harus Diisi"],
    maxlength: [225, "panjang nama harus antara 3-225 karakter"],
    minlength: [3, "panjang nama harus antara 3-225 karakter"],
  },
  username: {
    type: String,
    require: [true, "Email Harus Diisi"],
    maxlength: [225, "panjang username harus antara 3-225 karakter"],
    minlength: [3, "panjang username harus antara 3-225 karakter"],
  },
  password: {
    type: String,
    require: [true, "Kata Sandi Harus Diisi"],
    maxlength: [225, "panjang password harus antara 3-225 karakter"],
  },
  avatar:{
    type: String,
  },
  // status: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   default: "admin",
  // },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  phoneNumber: {
    type: String,
    require: [true, "Nomor Telepon Harus Diisi"],
  },
},{ timestamps: true });

adminSchema.path('email').validate(async function (value){
  try {
    const count = await this.model('Player').countDocuments({ email : value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} sudah terdaftar`)

adminSchema.pre('save', function (next){
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model("Admin", adminSchema);
