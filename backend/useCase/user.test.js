const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signup, login } = require('./user');

// Mocks
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/User');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signup', () => {
  it('should create a user and return 201', async () => {
    const req = {
      body: { mail: 'test@mail.com', password: 'pass123' },
    };
    const res = mockResponse();

    bcrypt.hash.mockResolvedValue('hashed_password');
    jest.spyOn(User.prototype, 'save').mockResolvedValue();

    await signup(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('pass123', 10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur créé !' });
  });

  it('should return 400 if user.save fails', async () => {
    const req = {
      body: { mail: 'test@mail.com', password: 'pass123' },
    };
    const res = mockResponse();

    bcrypt.hash.mockResolvedValue('hashed_password');
    jest
      .spyOn(User.prototype, 'save')
      .mockRejectedValue(new Error('Save failed'));

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: new Error('Save failed') });
  });

  it('should return 500 if bcrypt.hash fails', async () => {
    const req = {
      body: { mail: 'test@mail.com', password: 'pass123' },
    };
    const res = mockResponse();

    bcrypt.hash.mockRejectedValue(new Error('Hash failed'));

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: new Error('Hash failed') });
  });
});

describe('login', () => {
  it('should return 200 with userId and token if login is successful', async () => {
    const req = {
      body: { mail: 'test@mail.com', password: 'pass123' },
    };
    const res = mockResponse();

    const fakeUser = { _id: 'user123', password: 'hashed_password' };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked_token');

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ mail: 'test@mail.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('pass123', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user123' },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' },
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userId: 'user123',
      token: 'mocked_token',
    });
  });

  it('should return 401 if user not found', async () => {
    const req = { body: { mail: 'notfound@mail.com', password: 'pass123' } };
    const res = mockResponse();

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Utilisateur non trouvé !',
    });
  });

  it('should return 401 if password is invalid', async () => {
    const req = { body: { mail: 'test@mail.com', password: 'wrongpass' } };
    const res = mockResponse();

    User.findOne.mockResolvedValue({ password: 'hashed_password' });
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Mot de passe incorrect !',
    });
  });

  it('should return 500 if error occurs in bcrypt.compare', async () => {
    const req = { body: { mail: 'test@mail.com', password: 'pass123' } };
    const res = mockResponse();

    User.findOne.mockResolvedValue({ password: 'hashed_password' });
    bcrypt.compare.mockRejectedValue(new Error('Compare failed'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: new Error('Compare failed'),
    });
  });

  it('should return 500 if error occurs in User.findOne', async () => {
    const req = { body: { mail: 'test@mail.com', password: 'pass123' } };
    const res = mockResponse();

    User.findOne.mockRejectedValue(new Error('Find failed'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: new Error('Find failed') });
  });
});
