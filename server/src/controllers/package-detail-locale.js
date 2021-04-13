const pool = require('../pool');
const { toPgTimestamp } = require('../utils/time-util');

// create a new package detail locale
exports.createPackageDetailLocale = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO package_detail_locale
      (
        package_id,
        language_id,
        package_name,
        package_includes,
        package_excludes,
        package_itinerary,
        package_pickup_info,
        package_additional_info
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        req.body.package_id,
        req.body.language_id,
        req.body.package_name,
        JSON.stringify(req.body.package_includes),
        JSON.stringify(req.body.package_excludes),
        JSON.stringify(req.body.package_itinerary),
        JSON.stringify(req.body.package_pickup_info),
        JSON.stringify(req.body.package_additional_info)
      ]
    );

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errorMsg:
        err.message ===
        'duplicate key value violates unique constraint "package_detail_locale_unique"'
          ? 'this package detail with the given language already existed'
          : 'unable to add a package detail locale'
    });
  }
};
