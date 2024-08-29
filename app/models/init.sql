
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
  deposit_fee_submitted BOOLEAN DEFAULT FALSE, -- Added DEFAULT FALSE
  verification_method TEXT,
  location JSONB,
  verify_status BOOLEAN DEFAULT FALSE, -- Added DEFAULT FALSE
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
-- deposit_fee table with amount created at updated at 
CREATE TABLE IF NOT EXISTS deposit_fee(
  deposit_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  amount TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
-- Create table wallet fields can be user_id, wallet_balance, created_at, updated_at
CREATE TABLE IF NOT EXISTS wallet(
  wallet_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  user_id TEXT,
  wallet_balance TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
-- Create table for transaction fields can be user_id, transaction_type, amount, created_at, updated_at
CREATE TABLE IF NOT EXISTS transaction(
  transaction_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  user_id TEXT,
  transaction_type TEXT,
  amount TEXT,
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
-- create table admin wallet 
CREATE TABLE IF NOT EXISTS admin_wallet(
  admin_wallet_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  admin_wallet_balance TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
-- create table for admin transaction
CREATE TABLE IF NOT EXISTS admin_transaction(
  admin_transaction_id INT NOT NULL DEFAULT nextval('my_sequence') PRIMARY KEY,
  admin_wallet_id INT,
  transaction_type TEXT,
  amount TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);



