const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createPurchase = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO purchases 
      (
        product_locale_id, 
        package_detail_locale_id, 
        quantity_price_model, 
        user_id,
        discount, 
        total
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [
        req.body.product_locale_id,
        req.body.package_detail_locale_id,
        req.body.user_id,
        JSON.stringify(req.body.quantity_price_model),
        req.body.discount,
        req.body.total
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};
