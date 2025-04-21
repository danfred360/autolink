import { Pool } from 'pg';
import { UserService } from './UserService';

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('UserService', () => {
  let userService: UserService;
  let pool: jest.Mocked<Pool>;

  beforeEach(() => {
    pool = new Pool() as jest.Mocked<Pool>;
    userService = new UserService(pool);
  });

  it('should fetch all users', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const users = await userService.getUsers();
    expect(users).toEqual([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Users');
  });

  it('should fetch a user by ID', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] });
    const user = await userService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE id = $1', [1]);
  });
});