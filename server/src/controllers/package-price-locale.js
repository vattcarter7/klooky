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
        price_model
      ) VALUES ($1, $2, $3) RETURNING *;`,
      [
        req.body.package_id,
        req.body.language_id,
        JSON.stringify(req.body.price_model)
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg:
        err.message ===
        'duplicate key value violates unique constraint "package_price_locale_unique"'
          ? 'this package price with the given language already existed'
          : 'unable to add a package price locale'
    });
  }
};
