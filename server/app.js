
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const itemRoutes = require('./routes/item');
const purchaseRoutes = require('./routes/purchase');
const promotionCode = require('./routes/promotion-code');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin: '*',}));
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/item', itemRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/promotioncode', promotionCode);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});