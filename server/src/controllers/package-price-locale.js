const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// create a new package detail locale
exports.createPackagePriceLocale = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO package_price_locale
      (
        package_id,
        language_id,
        package_price_name,
        price
      ) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [
        req.body.package_id,
        req.body.language_id,
        req.body.package_price_name,
        req.body.price
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to add a package price locale'
    });
  }
};

// edit a package price locale
exports.editPackagePriceLocale = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM package_price_locale where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errorMsg: 'package price locale not found'
      });
    }

    const updateQuery = `UPDATE package_price_locale SET
                            package_id                    = $1,
                            language_id                   = $2,
                            package_price_name            = $3,
                            price                         = $4,
                            updated_at                    = to_timestamp($5)
                         WHERE id = $6 returning *;
                        `;

    const updateValues = [
      req.body.package_id === undefined
        ? response.rows[0].package_id
        : req.body.package_id,

      req.body.language_id === undefined
        ? response.rows[0].language_id
        : req.body.language_id,

      req.body.package_price_name === undefined
        ? response.rows[0].package_price_name
        : req.body.package_price_name,

      req.body.price === undefined ? response.rows[0].price : req.body.price,

      toPgTimestamp(Date.now()),

      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errorMsg: 'unable to update package price locale'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg: 'unable to update package price locale'
    });
  }
};
