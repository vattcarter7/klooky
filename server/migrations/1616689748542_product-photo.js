/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_photo (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX product_photo_product_id_idx ON product_photo(product_id);
    CREATE INDEX product_photo_user_id_idx ON product_photo(user_id);

    INSERT INTO product_photo (product_id, user_id, photo_url) 
    VALUES (1, 1, 'product_picture1.jpg'),
           (1, 1, 'product_picture2.jpg'),
           (1, 1, 'product_picture3.jpg');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_photo;
  `);
};
