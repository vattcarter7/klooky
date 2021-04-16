const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createCartItem = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO cart_item (package_id, user_id, quantity_price_model) VALUES ($1, $2, $3) RETURNING *;',
      [
        req.body.package_id,
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
