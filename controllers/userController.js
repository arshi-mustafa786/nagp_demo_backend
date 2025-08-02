    // controllers/userController.js
    const pool = require('../db');

    exports.getAllUsers = async (req, res) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    exports.getUserById = async (req, res) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    exports.createUser = async (req, res) => {
        const { name, email } = req.body; 
        if (!name || !email) { // Add validation
            return res.status(400).json({ message: 'Name, email are required' });
        }
        try {
            const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ message: 'User created successfully', userId: result.insertId }); // Return the ID of the new user
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating user' });
        }
    };
    
    // Update an existing user
    exports.updateUser = async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        if (!name || !email) { // Add validation
            return res.status(400).json({ message: 'Name, email are required' });
        }
        try {
            const [result] = await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
            if (result.affectedRows === 0) { // Check if the user to update actually exists
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating user' });
        }
    };
    
    exports.deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
            if (result.affectedRows === 0) { // Check if the user to delete actually exists
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting user' });
        }
    };