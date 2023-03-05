const db = require('../../lib/db');
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';

const SECRET = "WILDAN_GANTENG"
const handler = async(req, res) => {
  // const [cookies, setCookies, removeCookies] = useCookies('token')
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;
  // console.info(email, password)
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
    const token = jwt.sign({ user }, SECRET, {
      expiresIn: '1h',
    })

    // setCookies('token', token)
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export default handler