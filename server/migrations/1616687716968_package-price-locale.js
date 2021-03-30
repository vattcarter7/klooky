/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE package_price_locale (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      price_model JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX package_price_locale_package_id_idx ON package_price_locale(package_id);
    CREATE INDEX package_price_locale_language_id_idx ON package_price_locale(language_id);

    INSERT INTO package_price_locale (package_id, language_id, price_model)
    VALUES (1, 1, '[{ "name": "adult", "price": 15 }, { "name": "kid", "price": 10 }]'),
           (1, 2, '[{ "name": "성인", "price": 15 }, { "name": "아동", "price": 10 }]');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE package_price_locale;
  `);
};
