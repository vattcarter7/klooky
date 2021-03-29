/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_review_photo (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      reviewer_id INT REFERENCES users(id) NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO product_review_photo (product_id, reviewer_id, photo_url)
    VALUES (1, 1, 'image1.jpg'),
           (1, 1, 'image2.jpg');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_review_photo;
  `);
};
