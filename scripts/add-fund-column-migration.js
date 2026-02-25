import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const dbPath = path.join(__dirname, '..', 'data.db');
  
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Check if fund column exists
    const result = await db.all(
      "PRAGMA table_info(transactions)"
    );
    
    const hasFundColumn = result.some(col => col.name === 'fund');
    
    if (!hasFundColumn) {
      console.log('Adding fund column to transactions table...');
      await db.run(
        "ALTER TABLE transactions ADD COLUMN fund TEXT DEFAULT 'General Fund'"
      );
      console.log('✓ Fund column added successfully');
    } else {
      console.log('✓ Fund column already exists');
    }
    
    await db.close();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
