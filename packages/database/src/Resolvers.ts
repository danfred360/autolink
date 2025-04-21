import { Pool } from 'pg';

export const createResolvers = (pool: Pool) => ({
  Query: {
    users: async () => {
      const result = await pool.query('SELECT * FROM Users');
      return result.rows;
    },
    user: async (_: any, { id }: { id: number }) => {
      const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
      return result.rows[0];
    },
    cars: async (_: any, { userId }: { userId: number }) => {
      const result = await pool.query('SELECT * FROM Cars WHERE ownerId = $1', [userId]);
      return result.rows;
    },
    maintenanceRecords: async (_: any, { carId }: { carId: number }) => {
      const result = await pool.query('SELECT * FROM MaintenanceRecords WHERE carId = $1', [carId]);
      return result.rows;
    },
  },
  Mutation: {
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const result = await pool.query(
        'INSERT INTO Users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      return result.rows[0];
    },
    updateUser: async (_: any, { id, name, email }: { id: number; name?: string; email?: string }) => {
      const result = await pool.query(
        'UPDATE Users SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      return result.rows[0];
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      await pool.query('DELETE FROM Users WHERE id = $1', [id]);
      return true;
    },
  },
});