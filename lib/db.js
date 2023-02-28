const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'users',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  query: async (sql, values) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release();
    }
  },
};


