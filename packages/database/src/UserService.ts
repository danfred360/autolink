import { Pool } from 'pg';

export interface IUserService {
  getUsers(): Promise<any[]>;
  getUserById(id: number): Promise<any>;
}

export class UserService implements IUserService {
  constructor(private pool: Pool) { }

  async getUsers() {
    const result = await this.pool.query('SELECT * FROM Users');
    return result.rows;
  }

  async getUserById(id: number) {
    const result = await this.pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0];
  }
}