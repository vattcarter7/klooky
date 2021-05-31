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
      errMessage:
        err.message ===
        'duplicate key value violates unique constraint "package_detail_locale_unique"'
          ? 'this package detail with the given language already existed'
          : 'unable to add a package detail locale'
    });
  }
};

// edit a package detail locale
exports.editPackageDetailLocale = async (req, res) => {
  try {
    const textQuery = `SELECT * FROM package_detail_locale where id=$1`;
    const response = await pool.query(textQuery, [req.params.id]);
    if (!response.rows[0]) {
      return res.status(404).json({
        errMessage: 'product detail locale not found'
      });
    }

    const updateQuery = `UPDATE package_detail_locale SET
                            package_id                    = $1,
                            language_id                   = $2,
                            package_name                  = $3,
                            package_includes              = $4,
                            package_excludes              = $5,
                            package_itinerary             = $6,
                            package_pickup_info           = $7,
                            package_additional_info       = $8,
                            updated_at                    = to_timestamp($9)
                         WHERE id = $10 returning *;
                        `;

    const updateValues = [
      req.body.package_id === undefined
        ? response.rows[0].package_id
        : req.body.package_id,

      req.body.language_id === undefined
        ? response.rows[0].language_id
        : req.body.language_id,

      req.body.package_name === undefined
        ? response.rows[0].package_name
        : req.body.package_name,

      req.body.package_includes === undefined
        ? JSON.stringify(response.rows[0].package_includes)
        : JSON.stringify(req.body.package_includes),

      req.body.package_excludes === undefined
        ? JSON.stringify(response.rows[0].package_excludes)
        : JSON.stringify(req.body.package_excludes),

      req.body.package_itinerary === undefined
        ? JSON.stringify(response.rows[0].package_itinerary)
        : JSON.stringify(req.body.package_itinerary),

      req.body.package_pickup_info === undefined
        ? JSON.stringify(response.rows[0].package_pickup_info)
        : JSON.stringify(req.body.package_pickup_info),

      req.body.package_additional_info === undefined
        ? JSON.stringify(response.rows[0].package_additional_info)
        : JSON.stringify(req.body.package_additional_info),

      toPgTimestamp(Date.now()),

      req.params.id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    if (!rows[0]) {
      return res.status(400).json({
        errMessage: 'unable to update package detail locale'
      });
    }

    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      errMessage: 'unable to update package detail locale'
    });
  }
};
