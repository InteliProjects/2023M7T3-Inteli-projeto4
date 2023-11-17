import { login } from '../routes/services/user.service';
import * as User from '../models/user';

jest.mock('../models/user', () => ({
  findByCredentials: jest.fn(),  // explicitly mock this function
}));

describe('User Service', () => {
  
  beforeEach(() => {
    if (User.findByCredentials && typeof User.findByCredentials.mockClear === 'function') {
      User.findByCredentials.mockClear();
    }
  });

  it('should login user correctly', async () => {
    const req = { body: { email: 'test@test.com', password: 'password' } };
    const res = { cookie: jest.fn(), send: jest.fn() };

    if (User.findByCredentials) {
      User.findByCredentials.mockResolvedValue({
        generateAuthToken: async () => 'token',
        toObject: () => ({ password: 'password' })
      });
    }

    await login(req, res);

    expect(res.cookie).toHaveBeenCalledWith('token', 'token', expect.any(Object));
    expect(res.send).toHaveBeenCalledWith(expect.any(Object));
  });
});
