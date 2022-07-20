const mongoose = require("mongoose");

let hasilTanamSchema = mongoose.Schema({
  name_user: {
    type: String,
    require: [true, "Suhu Humidity Harus Diisi"],
    
  },
  jenis_tanaman: {
    type: String,
    require: [true, "Jenis tanaman Celcius Harus Diisi"],
  },
  stock: {
    type: String,
    require: [true, "Stock Harus Diisi"],
  },
  harga: {
    type: String,
    require: [true, "Harga Harus Diisi"],
  },
},{ timestamps: true });

module.exports = mongoose.model("HasilTanam", hasilTanamSchema);
