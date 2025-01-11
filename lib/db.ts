import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '980911',
  database: 'poketrader',
  port: 3306
};

// Exportera konfigurationen så att den kan användas i phpMyAdmin
export const phpMyAdminConfig = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
};

export async function query(sql: string, params: any[] = []) {
  console.log('Attempting to connect to database with config:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    port: dbConfig.port
  });
  
  const connection = await mysql.createConnection(dbConfig);
  try {
    console.log('Connected to database. Executing query:', sql);
    const [results] = await connection.execute(sql, params);
    console.log('Query executed successfully');
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  } finally {
    await connection.end();
    console.log('Database connection closed');
  }
}

export async function tableExists(tableName: string): Promise<boolean> {
  try {
    await query(`SELECT 1 FROM ${tableName} LIMIT 1`);
    return true;
  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return false;
    }
    throw error;
  }
}

