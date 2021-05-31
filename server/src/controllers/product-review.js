const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

exports.createReview = async (req, res) => {
  try {
    const { rows } = await pool.query(
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

exports.editReview = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM product_reviews where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errMessage: 'package not found'
      });
    }

    const updateQuery = `UPDATE product_reviews SET
                            rating            =$1,
                            comment           =$2,
                            photos            =$3,
                            updated_at        =to_timestamp($4)
                          WHERE id = $5 returning *;
                        `;

    const updateValues = [
      req.body.rating,
      req.body.comment,
      JSON.stringify(req.body.photos),
      toPgTimestamp(Date.now()),
      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        err: err.message,
        errMessage: 'unable to update review rating'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM product_reviews WHERE id=$1 returning *',
      [req.params.id]
    );

    if (!rows[0])
      return res.status(404).json({
        errMessage: 'cannot delete that product review'
      });

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};
