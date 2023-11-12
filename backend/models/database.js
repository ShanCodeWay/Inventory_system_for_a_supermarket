// database.js
const mongoose        = require('mongoose');


mongoose.connect('mongodb+srv://wijebahuwmpwdgb20:dgb123@inventory.nk3kupt.mongodb.net/inventory?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const ItemSchema = new mongoose.Schema({
  itemID: {
    type              : String,
    unique            : true,
    required          : true,
  },
  name                : String,
  category            : String,
  quantity            : Number,
  description         : String,
  price               : Number,
});

module.exports.Item   = mongoose.model('Item', ItemSchema);
