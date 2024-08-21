const { user } = require("pg/lib/defaults");
const { pool } = require("../../config/db.config");
const { twilio_test_phone, accountSid, authToken } = require("../../urls");
const twilio = require("twilio");

exports.verifyPhone = async (req, res) => {
  const client = await pool.connect();

  try {
    const { phone } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    // const client1 = new twilio(accountSid, authToken);
    // // TWILIO SERVICE SEND MESSAGE TO PHONE
    // await client1.messages.create({
    //   body: `Your verification code is ${otp}`,
    //   from: twilio_test_phone,
    //   to: phone,
    // });

    // Delete existing record for the phone number (if any)
    const deleteQuery =
      "DELETE FROM phone_verification_codes WHERE phone_no = $1";
    await client.query(deleteQuery, [phone]);

    // Add record in phone_verification_codes table
    const insertQuery = `
        INSERT INTO phone_verification_codes (phone_no, code, created_at, updated_at)
        VALUES ($1, $2, NOW(), NOW());
    `;
    await client.query(insertQuery, [phone, otp]);
    res.status(200).json({
      error: false,
      otp: otp,
      message: "Message sent and record added/updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to send message or add/update record",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};
exports.verifyCode = async (req, res) => {
  const client = await pool.connect();

  try {
    const { phone, code } = req.body;

    const query =
      "SELECT * FROM phone_verification_codes WHERE phone_no = $1 AND code = $2";
    const { rows } = await client.query(query, [phone, code]);

    if (rows.length === 0) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid verification code" });
    }

    // Check if user exists with the given phone number
    const userQuery = "SELECT * FROM users WHERE phone_no = $1";
    const { rows: userRows } = await client.query(userQuery, [phone]);

    if (userRows.length === 0) {
      // If user doesn't exist, create a new user with empty fields
      const createUserQuery =
        "INSERT INTO users (phone_no) VALUES ($1) RETURNING *";
      const { rows: newUserRows } = await client.query(createUserQuery, [
        phone,
      ]);

      // Since it's a new user, they won't have a profile yet
      return res.status(200).json({
        error: false,
        message: "Verification successful",
        user: newUserRows[0],
        profile: null, // No profile exists for the new user
      });
    } else {
      // If user exists, fetch their profile details
      const getProfileQuery = "SELECT * FROM profile_detail WHERE user_id = $1";
      const { rows: profileRows } = await client.query(getProfileQuery, [
        userRows[0].user_id,
      ]);

      res.status(200).json({
        error: false,
        message: "Verification successful",
        user: userRows[0],
        profile: profileRows.length > 0 ? profileRows[0] : null, // Return null if no profile found
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to verify code",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};

// OnBOARDING SCREENS
exports.addAboutUs = async (req, res) => {
  const client = await pool.connect();

  try {
    const { heading, paragraph } = req.body;

    // Check if there are already 3 records in the table
    const countQuery = "SELECT COUNT(*) FROM about_screen";
    const { rows: countRows } = await client.query(countQuery);
    const count = parseInt(countRows[0].count);

    let order_id;
    if (count === 0) {
      order_id = 1; // Set order_id to 1 if no records exist
    } else if (count >= 3) {
      return res.status(400).json({
        error: true,
        message: "Only 3 records are allowed in the table",
      });
    } else {
      // Get the maximum order_id and increment it by 1
      const maxOrderIdQuery = "SELECT MAX(order_id) FROM about_screen";
      const { rows: maxOrderIdRows } = await client.query(maxOrderIdQuery);
      const maxOrderId = parseInt(maxOrderIdRows[0].max) || 0;
      order_id = maxOrderId + 1;
    }

    // Add record in about_screen table
    const insertQuery = `
        INSERT INTO about_screen (heading, paragraph, order_id, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW());
    `;
    await client.query(insertQuery, [heading, paragraph, order_id]);
    res
      .status(200)
      .json({ error: false, message: "Record added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: true, message: "Failed to add record", error_obj: error });
  } finally {
    client.release();
  }
};
exports.updateAboutUs = async (req, res) => {
  const client = await pool.connect();

  try {
    const { order_id, heading, paragraph } = req.body;

    // Check if the record exists
    const query = "SELECT * FROM about_screen WHERE order_id = $1";
    const { rows } = await client.query(query, [order_id]);

    if (rows.length === 0) {
      return res
        .status(400)
        .json({ error: true, message: "Record does not exist" });
    }

    // Update record in about_screen table
    const updateQuery = `
        UPDATE about_screen
        SET heading = $1, paragraph = $2, updated_at = NOW()
        WHERE order_id = $3;
    `;
    await client.query(updateQuery, [heading, paragraph, order_id]);
    res
      .status(200)
      .json({ error: false, message: "Record updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to update record",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};
// get about_screen from about_screen table sort by asc order id
exports.getAboutUs = async (req, res) => {
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM about_screen ORDER BY order_id ASC";
    const { rows } = await client.query(query);

    res.status(200).json({ error: false, about_us: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to fetch about us details",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};

exports.updateUser = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      phone,
      email,
      full_name,
      full_address,
      dob, // format: DD-MM-YYYY
      verification_method,
      location,
      profile_pic,
      nric_no,
      front_id_pic,
      back_id_pic,
      front_id_license,
      back_id_license,
    } = req.body;

    // Check if user exists with the given phone number
    const userQuery = "SELECT * FROM users WHERE phone_no = $1";
    let { rows: userRows } = await client.query(userQuery, [phone]);

    if (userRows.length === 0) {
      return res
        .status(400)
        .json({ error: true, message: "User does not exist" });
    }
    // check if all fields are provided
    if (
      !email ||
      !full_name ||
      !full_address ||
      !dob ||
      !verification_method ||
      !location ||
      !profile_pic ||
      !nric_no ||
      !front_id_pic ||
      !back_id_pic ||
      !front_id_license ||
      !back_id_license
    ) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }
    // Validate NRIC number format
    const nricRegex = /^[STFGM]\d{7}[A-Z]$/;
    if (!nricRegex.test(nric_no)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid NRIC number format" });
    }
    // Parse the provided date of birth (DOB)
    const [day, month, year] = dob.split("-");
    const userDob = new Date(`${year}-${month}-${day}`);

    // Calculate user's age based on the provided date of birth
    const currentDate = new Date();
    const ageDiff = currentDate - userDob;
    const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));

    if (age < 22) {
      return res
        .status(400)
        .json({ error: true, message: "User must be at least 22 years old" });
    }

    // Update user details
    const updateUserQuery = `
        UPDATE users
        SET email = $1, full_name = $2, dob = $3, verification_method = $4, location = $5, account_status = false
        WHERE phone_no = $6;
    `;
    await client.query(updateUserQuery, [
      email,
      full_name,
      dob,
      verification_method,
      location,
      phone,
    ]);

    // Check if user has a profile in profile_details table
    const profileQuery = "SELECT * FROM profile_detail WHERE user_id = $1";
    let { rows: profileRows } = await client.query(profileQuery, [
      userRows[0].user_id,
    ]);
    console.log(profileRows);

    if (profileRows.length === 0) {
      // Insert new profile details
      const insertProfileQuery = `
            INSERT INTO profile_detail (user_id, profile_pic, full_address, NRIC_no, front_id_pic, back_id_pic, front_id_license, back_id_license)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;
      await client.query(insertProfileQuery, [
        userRows[0].user_id,
        profile_pic,
        full_address,
        nric_no,
        front_id_pic,
        back_id_pic,
        front_id_license,
        back_id_license,
      ]);
    } else {
      // Update existing profile details
      const updateProfileQuery = `
            UPDATE profile_detail
            SET profile_pic = $1, full_address = $2, NRIC_no = $3, front_id_pic = $4, back_id_pic = $5, front_id_license = $6, back_id_license = $7
            WHERE user_id = $8;
        `;
      await client.query(updateProfileQuery, [
        profile_pic,
        full_address,
        nric_no,
        front_id_pic,
        back_id_pic,
        front_id_license,
        back_id_license,
        userRows[0].user_id,
      ]);
    }

    res.status(200).json({
      error: false,
      message: "User updated successfully",
      user:{
        phone,
        email,
        full_name,
        dob,
        verification_method,
        location,
      },
      profile: {
        profile_pic,
        full_address,
        NRIC_no: nric_no,
        front_id_pic,
        back_id_pic,
        front_id_license,
        back_id_license,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to update user",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};

// The Singapore National Registration Identity Card (NRIC) number follows a specific format. According to Wikipedia, the NRIC number comprises 9 alphanumeric characters, with the first letter indicating the holder's status (S for Singapore citizens, T for permanent residents, F/G/M for foreigners). The remaining 7 digits are unique identifiers, and the final character is a checksum.
// get user by user id and all its profile from profile_detail table

exports.getUserProfile = async (req, res) => {
  const client = await pool.connect();

  try {
    const { user_id } = req.body;

    // Get user details from users table
    const userQuery = "SELECT * FROM users WHERE user_id = $1";
    const { rows: userRows } = await client.query(userQuery, [user_id]);

    if (userRows.length === 0) {
      return res
        .status(400)
        .json({ error: true, message: "User does not exist" });
    }

    // Get profile details from profile_detail table
    const profileQuery = "SELECT * FROM profile_detail WHERE user_id = $1";
    const { rows: profileRows } = await client.query(profileQuery, [user_id]);

    res.status(200).json({
      error: false,
      user: userRows[0],
      profile: profileRows.length > 0 ? profileRows[0] : null,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: true,
      message: "Failed to fetch user profile",
      error_obj: error,
    });
  } finally {
    client.release();
  }
};
