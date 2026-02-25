import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../app/data/database.db')

try {
  const db = new Database(dbPath)
  
  // Update all users with viewer email to have viewer_user role
  const result = db.prepare(`
    UPDATE users 
    SET role = 'viewer_user' 
    WHERE email LIKE '%viewer%'
  `).run()
  
  console.log(`Updated ${result.changes} viewer user(s) with viewer_user role`)
  
  // Also update specific email if needed
  const viewerUser = db.prepare(`
    SELECT * FROM users WHERE email = 'viewer@demo.com'
  `).get()
  
  if (viewerUser) {
    db.prepare(`
      UPDATE users 
      SET role = 'viewer_user' 
      WHERE email = 'viewer@demo.com'
    `).run()
    console.log(`Updated viewer@demo.com to viewer_user role`)
  } else {
    console.log('No user found with email viewer@demo.com')
    const allUsers = db.prepare('SELECT id, email, role FROM users').all()
    console.log('All users:', allUsers)
  }
  
  db.close()
  console.log('Done!')
} catch (error) {
  console.error('Error:', error.message)
  process.exit(1)
}
