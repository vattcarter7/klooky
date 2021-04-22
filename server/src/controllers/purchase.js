const format = require('pg-format');
const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// add purchase order
exports.createPurchase = async (req, res) => {
  await pool.query('BEGIN');
  try {
    // make sure the cart item quantity is greater than 0
    const cartItemQuery = `SELECT
                              product_locale_id,
                              package_detail_locale_id,
                              user_id,
                              quantity_price_model
                          FROM cart_item
                          WHERE user_id = $1;
                          `;
    // TODO: change value of cartItemValue from 1 to req.user.id with middleware
    const cartItemValue = [1];

    const cartItemResponse = await pool.query(cartItemQuery, cartItemValue);

    if (!cartItemResponse.rows || cartItemResponse.rows.length === 0) {
      return res.status(404).json({
        errMsg: 'No cart items found to purchase'
      });
    }

    // *** the purchase values must be strictly formed by fields in order
    // *** product_locale_id, package_detail_locale_id, user_id, quantity_price_model, discount, total
    let purchaseValues = [];

    cartItemResponse.rows.map((v) => {
      let cartItemTotalPrice = 0;
      v.quantity_price_model.map((p) => {
        cartItemTotalPrice += p.pax * p.price;
      });
      v.quantity_price_model = { ...v.quantity_price_model };
      // TODO: modified v.discount here
      v.discount = 0;
      v.total = cartItemTotalPrice;
      purchaseValues.push(Object.values(v));
    });

    console.log('PURCHASE_VALUES:', JSON.stringify(purchaseValues, null, 2));

    // add to purchase table
    // 1. insert into table purchase with cartItemResponse
    const purchaseQuery = format(
      `INSERT INTO purchase 
      (
        product_locale_id, 
        package_detail_locale_id, 
        user_id, 
        quantity_price_model,
        discount,
        total
      ) 
      VALUES %L returning *`,
      purchaseValues
    );

    const purchaseResponse = await pool.query(purchaseQuery);

    // TODO: change the value 1 on the delete cart items to req.user.id
    await pool.query(`DELETE FROM cart_item WHERE user_id = $1`, [1]);

    // TODO: charge for the purchase made with stipe or bongloy

    await pool.query('COMMIT');

    res.send(purchaseResponse.rows);
  } catch (err) {
    console.log(err);
    await pool.query('ROLLBACK');
    res.status(400).json({
      err: err.message,
      errMsg: 'unable to make a purchase'
    });
  }
};
