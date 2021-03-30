/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_photo_description_locale (
      id SERIAL PRIMARY KEY,
      product_photo_id INT REFERENCES product_photo(id) NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      description VARCHAR NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE product_photo_description_locale ADD CONSTRAINT product_photo_description_locale_unique UNIQUE (product_photo_id, language_id); 

    CREATE INDEX product_photo_description_locale_product_photo_id_idx ON product_photo_description_locale(product_photo_id);
    CREATE INDEX product_photo_description_locale_user_id_idx ON product_photo_description_locale(user_id);
    CREATE INDEX product_photo_description_locale_language_id_idx ON product_photo_description_locale(language_id);

    INSERT INTO product_photo_description_locale (product_photo_id, user_id, language_id, description)
    VALUES (1, 1, 1, 'picture1 description'),
           (1, 1, 2, 'picture1 설명서'),
           (2, 1, 1, 'picture2 description'),
           (2, 1, 2, 'picture2 성명서'),
           (3, 1, 1, 'picture3 description'),
           (3, 1, 2, 'picture3 성명서');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_photo_description_locale;
  `);
};
