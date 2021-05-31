const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// create a new package detail locale
exports.createPackagePriceLocale = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO package_price_locale
      (
        package_detail_locale_id,
        package_price_name,
        price,
        min_age,
        max_age,
        min_pax,
        max_pax,
        is_with_adult_required
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        req.body.package_detail_locale_id,
        req.body.package_price_name,
        req.body.price,
        req.body.min_age,
        req.body.max_age,
        req.body.min_pax,
        req.body.max_pax,
        req.body.is_with_adult_required || false
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errMessage: 'unable to add a package price locale'
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
        errMessage: 'package price locale not found'
      });
    }

    const updateQuery = `UPDATE package_price_locale SET
                            package_detail_locale_id      = $1,
                            package_price_name            = $2,
                            price                         = $3,
                            min_age                       = $4,                     
                            max_age                       = $5,
                            min_pax                       = $6,
                            max_pax                       = $7,
                            is_with_adult_required        = $8,
                            updated_at                    = to_timestamp($9)
                         WHERE id = $10 returning *;
                        `;

    const updateValues = [
      req.body.package_detail_locale_id === undefined
        ? response.rows[0].package_detail_locale_id
        : req.body.package_detail_locale_id,

      req.body.package_price_name === undefined
        ? response.rows[0].package_price_name
        : req.body.package_price_name,

      req.body.price === undefined ? response.rows[0].price : req.body.price,

      req.body.min_age === undefined
        ? response.rows[0].min_age
        : req.body.min_age,

      req.body.max_age === undefined
        ? response.rows[0].max_age
        : req.body.max_age,

      req.body.min_pax === undefined
        ? response.rows[0].min_pax
        : req.body.min_pax,

      req.body.max_pax === undefined
        ? response.rows[0].max_pax
        : req.body.max_pax,

      req.body.is_with_adult_required === undefined
        ? response.rows[0].is_with_adult_required
        : req.body.is_with_adult_required,

      toPgTimestamp(Date.now()),

      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errMessage: 'unable to update package price locale'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errMessage: 'unable to update package price locale'
    });
  }
};
