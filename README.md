### Tour project

##### how to migrate 

Run this command in the terminal
> DATABASE_URL=postgres://vattsopheak:@localhost:5432/klooky npm run migrate up

postgresql://dbuser:secretpassword@database.server.com:3211/mydb



##### Backend Testing
> suppertest

##### Frontend Tesing 
> cypress 
> Reference: 
> https://github.com/cypress-io/cypress-example-todomvc-redux [with redux]
> https://www.youtube.com/watch?v=dVRivkL5eGc&ab_channel=BasaratAli [set up cypress testing from youtube]


##### database diagram
> https://app.diagrams.net/?src=about#G1p_r4AR2hlwR-bIIqNQf-k4Q0QuuSztu8

##### passport.js full explaination on youtube
> https://www.youtube.com/watch?v=RGJFAfvhQZg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=14&ab_channel=TheNetNinja

##### google and facebook api and service oauth2
> https://console.cloud.google.com/apis/dashboard (maxcarter.us@gmail.com)
> https://developers.facebook.com/apps/ (maxcarter.us@gmail.com)


###### price_model JSONB constraint commands
    ALTER TABLE package_price_locale 
    ADD CONSTRAINT package_price_locale_price_model_price_is_positive_number
    CHECK (
      (price_model->'price') IS NOT NULL
        AND
      jsonb_typeof(price_model->'price') = 'number'
        AND
      (price_model->'price')::INT > 0
    );

    ALTER TABLE package_price_locale 
    ADD CONSTRAINT package_price_locale_price_model_name_is_string
    CHECK (
      (price_model->'name') IS NOT NULL
        AND
      jsonb_typeof(price_model->'name') = 'string'
    );

    INSERT INTO package_price_locale (package_id, language_id, price_model)
    VALUES (1, 1, '{ "name": "adult", "price": 15 }');