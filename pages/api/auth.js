const db = require('../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const rows = await db.query('SELECT * FROM user_login WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password email' });
    }

    const user = rows[0];

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}