const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createCartItem = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO cart_item 
      (
        product_locale_id,
        package_detail_locale_id,
        user_id, 
        quantity_price_model
      ) 
       VALUES ($1, $2, $3, $4) RETURNING *;`,
      [
        req.body.product_locale_id,
        req.body.package_detail_locale_id,
        req.body.user_id,
        JSON.stringify(req.body.quantity_price_model)
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to add a cart item'
    });
  }
};
