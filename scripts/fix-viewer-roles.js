import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function fixViewerRoles() {
  const db = await open({
    filename: path.join(process.cwd(), 'data.db'),
    driver: sqlite3.Database,
  });

  try {
    // Get all users
    const users = await db.all('SELECT * FROM users');
    console.log('All users:', users);

    // Check viewer_access table
    const viewerAccess = await db.all('SELECT * FROM viewer_access');
    console.log('Viewer access records:', viewerAccess);

    // Update any viewer users that don't have the correct role
    if (viewerAccess.length > 0) {
      for (const access of viewerAccess) {
        const viewer = await db.get('SELECT * FROM users WHERE id = ?', [access.viewerId]);
        if (viewer && viewer.role !== 'viewer_user') {
          console.log(`Updating user ${viewer.email} role from ${viewer.role} to viewer_user`);
          await db.run('UPDATE users SET role = ? WHERE id = ?', ['viewer_user', viewer.id]);
        }
      }
    }

    // Also check for any user with viewer in email
    const potentialViewers = await db.all("SELECT * FROM users WHERE email LIKE '%viewer%'");
    for (const user of potentialViewers) {
      if (user.role !== 'viewer_user') {
        console.log(`Updating user ${user.email} role from ${user.role} to viewer_user`);
        await db.run('UPDATE users SET role = ? WHERE id = ?', ['viewer_user', user.id]);
      }
    }

    console.log('Role update complete');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.close();
  }
}

fixViewerRoles();
