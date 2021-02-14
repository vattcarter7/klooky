const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createPurchase = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO purchases (quantity_price_model, discount, total) VALUES ($1, $2, $3) RETURNING *;',
      [
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
