const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createCartItem = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO packages (quantity_price_model) VALUES ($1) RETURNING *;',
      [JSON.stringify(req.body.price_model)]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};