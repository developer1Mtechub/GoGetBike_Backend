
CREATE SEQUENCE IF NOT EXISTS my_sequence START 100000;

-- create table for phone no verification codes 
CREATE TABLE IF NOT EXISTS phone_verification_codes(
  code_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  phone_no TEXT,
  code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS users(
  user_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  dob TEXT,
  phone_no TEXT,
  verification_method TEXT,
  latitude TEXT,
  longitude TEXT,
  account_status TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS profile_detail(
  profile_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  user_id TEXT,
  profile_pic TEXT,
  full_address TEXT,
  NRIC_no TEXT,
  front_id_pic TEXT,
  back_id_pic TEXT,
  front_id_license TEXT,
  back_id_license TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS about_screen(
  about_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  heading TEXT,
  paragraph TEXT,
  order_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


