const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createReview = async (req, res) => {
  try {
    const {
      rows
    } = await pool.query(
      'INSERT INTO product_reviews (rating, comment, photos) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.rating, req.body.comment, JSON.stringify(req.body.photos)]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};
