const { pool } = require("../../config/db.config");

exports.addUpdateSecurityDepositAmount = async (req, res) => {
    const client = await pool.connect();

    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                error: true,
                message: "Please provide the amount",
            });
        }

        const query = `
            INSERT INTO deposit_fee (deposit_id, amount)
            VALUES (1, $1)
            ON CONFLICT (deposit_id) DO UPDATE
            SET amount = $1, updated_at = NOW()
            RETURNING *;
        `;

        const values = [amount];

        const result = await client.query(query, values);

        if (result.rowCount > 0) {
            res.status(200).json({
                error: false,
                message: "Security deposit amount added/updated successfully",
                data: result.rows[0],
            });
        } else {
            res.status(400).json({
                error: true,
                message: "Failed to add/update security deposit amount",
            });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Failed to add/update record",
            error_obj: error,
        });
    } finally {
        client.release();
    }
};
// get deposit amount 
exports.getSecurityDepositAmount = async (req, res) => {
    const client = await pool.connect();

    try {
        const query = `
            SELECT * FROM deposit_fee WHERE deposit_id = 1;
        `;

        const result = await client.query(query);

        if (result.rowCount > 0) {
            res.status(200).json({
                error: false,
                data: result.rows[0],
            });
        } else {
            res.status(400).json({
                error: true,
                message: "No security deposit amount found",
            });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Failed to get record",
            error_obj: error,
        });
    } finally {
        client.release();
    }
};
  
