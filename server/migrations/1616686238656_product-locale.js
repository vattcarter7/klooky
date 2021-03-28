/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_locale (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      product_name VARCHAR UNIQUE NOT NULL,
      product_validity JSONB NOT NULL,
      product_overview TEXT NOT NULL,
      product_highlights JSONB NOT NULL,
      product_prohibition_limitation JSONB,
      product_confirmation JSONB NOT NULL,
      product_cancelation_policy JSONB NOT NULL, 
      product_additional_info JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE product_locale ADD CONSTRAINT product_locale_unique UNIQUE (product_id, language_id);

    INSERT INTO product_locale (product_id, language_id, product_name, product_validity, 
      product_overview, product_highlights, product_prohibition_limitation, product_confirmation, 
      product_cancelation_policy, product_additional_info)
    VALUES (
      1,
      1,
      'Angkor Classic Tour',
      '["The voucher is only valid on the specified date and time"]',
      '["Discover the majestic beauty of Cambodia religion and nature on this exploration of Siem Reap, which takes you to three of the most popular temples in the area. Customize your experience from the get-go and choose between a join in and private tour. Begin with a pick up at your hotel, right before you head off to Angkor Wat to watch the captivating sun rise behind the temple complex. Walk through one of the largest religious structures in the world and admire the intricate carvings of heavenly nymphs on the walls ..."]',
      '["Walk through Angkor Wat and marvel at the incredibly intricate carvings on its walls", "Witness a sunrise unlike any other at the beautiful Angkor Wat Temple, one of the largest religious monuments", "Explore the beautiful Bayon Temple, known for the many mysterious faces engraved on its towers"]',
      '["Please dress appropriately when entering sacred sites. Participants are advised to wear long pants and a long-sleeved shirt or scarf to cover their shoulders", "This group tour is not suitable for children aged 0-9"]',
      '["You will receive confirmation of your booking instantly via email. In the event that you do not receive an email from us, please check your Spam folder or notify us via email"]',
      '["Full refunds will be issued for cancellations made at least 24 hours before the selected activity date"]',
      '["Angkor Passes are required to enter Angkor Enterprise. Guests may select either a one day pass (USD37) - three day pass (USD62) or seven day pass (USD72) - which need to be used on consecutive days", "The tour will start with a visit to the ticket office in order for guests to purchase an Angkor Pass"]'
    ), 
    (
      1,
      2,
      '앙코르 클라식 투어',
      '["바우처는 지정된 날짜와 시간에 한해 유효합니다.", "출력된 바우처 또는 모바일 바우처를 제시하세요."]',
      '["사원들 속에서 씨엠립의 자연을 온전히 느끼는 아침! 동이 트기 전, 호텔에서 픽업을 받아 일출을 보기 위해 앙코르 와트로 향합니다. 앙코르 와트를 배경으로 떠오르는 일출은 평생 잊을 수 없는 풍경으로 남을 거예요. 해가 뜨고 난 후에는 세계에서 가장 큰 종교 건축물을 거닐며 벽에 새겨진 섬세한 조각들을 감상하세요. 현지 가이드가 이 사원에 담겨 있는 역사 이야기를 재미있게 들려준답니다..."]',
      '["앙코르와트를 거닐며 벽에 새겨진 섬세한 조각들을 발견하세요.", "앙코르와트에서는 세상 어디에서도 볼 수 없는 일출을 감상할 수 있습니다.", "영화인 툼레이더 의 촬영지로 유명한 따프롬 사원을 방문합니다."]',
      '["편안 옷을 입으세요."]',
      '["예약 후, 확정 메일과 바우처가 바로 발송됩니다.", "이메일을 받지 못한 경우, 스팸 메일함을 확인하거나 고객센터로 문의주세요."]',
      '["본 상품은 활동 시작 24시간 전 예약 취소시 전액 환불이 가능합니다."]',
      '["앙코르 티켓 1일 37$, 3일 62$, 7일 72$ "]'
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_locale;
  `);
};
