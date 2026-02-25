import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function addFundColumn() {
  const db = await open({
    filename: path.join(process.cwd(), 'data.db'),
    driver: sqlite3.Database,
  });

  try {
    // Check if fund column already exists
    const result = await db.all("PRAGMA table_info(transactions)");
    const hasFundColumn = result.some(col => col.name === 'fund');

    if (hasFundColumn) {
      console.log('Fund column already exists');
      await db.close();
      return;
    }

    // Add fund column if it doesn't exist
    await db.run("ALTER TABLE transactions ADD COLUMN fund TEXT DEFAULT 'General Fund'");
    console.log('Successfully added fund column to transactions table');

    await db.close();
  } catch (error) {
    console.error('Error adding fund column:', error);
    await db.close();
    process.exit(1);
  }
}

addFundColumn();
