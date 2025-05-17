import { query } from '../db.js';

// Get all users
export const getAllUsers = async () => {
  try {
    const result = await query('SELECT id, email, created_at FROM users ORDER BY created_at DESC', []);
    return result.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

// Get a single user by ID
export const getUserById = async (id) => {
  try {
    const result = await query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
};

// Create a new user
export const createUser = async (userData) => {
  const { email, password } = userData;
  
  try {
    const result = await query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, password] // Note: In a real app, you should hash the password
    );
    
    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Update a user
export const updateUser = async (id, userData) => {
  const { email, password } = userData;
  
  try {
    const result = await query(
      'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING id, email, created_at',
      [email, password, id] // Note: In a real app, you should hash the password
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id, email, created_at', [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};