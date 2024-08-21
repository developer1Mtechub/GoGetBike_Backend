
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
  location JSONB,
  account_status TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS profile_detail(
  profile_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  user_id TEXT,
  profile_pic JSONB,
  full_address TEXT,
  NRIC_no TEXT,
  front_id_pic JSONB,
  back_id_pic JSONB,
  front_id_license JSONB,
  back_id_license JSONB,
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


