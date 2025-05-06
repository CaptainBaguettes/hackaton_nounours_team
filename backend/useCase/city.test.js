const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const City = require('../models/City');
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require('../useCase/city');


// Mock Express req/res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {});
});

afterEach(async () => {
  await City.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('createCity', () => {
  it('should create a city with valid data', async () => {
    const req = {
      body: {
        name: 'Paris',
        latitude: 48.8566,
        longitude: 2.3522,
        nb_population: 2000000,
        nb_doctors: 5000,
      }
    };
    const res = mockResponse();

    await createCity(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Paris',
      nb_population: 2000000,
    }));
  });

  it('should return 400 for invalid data', async () => {
    const req = { body: { name: 123 } };
    const res = mockResponse();

    await createCity(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Invalid name'
    }));
  });
});

describe('getAllCities', () => {
  it('should return all cities', async () => {
    await City.create({
      name: 'Lyon',
      latitude: 45.75,
      longitude: 4.85,
      nb_population: 500000,
      nb_doctors: 300,
    });

    const req = {};
    const res = mockResponse();

    await getAllCities(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ name: 'Lyon' })
    ]));
  });
});

describe('getCityById', () => {
  it('should return the city by ID', async () => {
    const city = await City.create({
      name: 'Marseille',
      latitude: 43.3,
      longitude: 5.4,
      nb_population: 800000,
      nb_doctors: 200,
    });

    const result = await getCityById(city._id);
    expect(result.name).toBe('Marseille');
  });

  it('should throw error if city not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    await expect(getCityById(fakeId)).rejects.toThrow('City no>t found');
  });
});

describe('updateCity', () => {
  it('should update city info', async () => {
    const city = await City.create({
      name: 'Nice',
      latitude: 43.7,
      longitude: 7.26,
      nb_population: 300000,
      nb_doctors: 100,
    });

    const updated = await updateCity(city._id, { nb_population: 350000 });
    expect(updated.nb_population).toBe(350000);
  });

  it('should throw error if city not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await expect(updateCity(fakeId, {})).rejects.toThrow('City not found');
  });
});

it('should return 400 for invalid latitude or longitude', async () => {
  const req = {
    body: {
      name: 'Paris',
      latitude: 'not-a-number',
      longitude: 2.35,
      nb_population: 100000,
      nb_doctors: 100,
    },
  };
  const res = mockResponse();

  await createCity(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: 'Invalid latitude or longitude',
  });
});

it('should handle error in getAllCities', async () => {
  const req = {};
  const res = mockResponse();

  jest.spyOn(City, 'find').mockImplementation(() => {
    throw new Error('DB failed');
  });

  await getAllCities(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      error: 'DB failed',
    }),
  );

  City.find.mockRestore();
});

it('should handle error in createCity', async () => {
  const req = {
    body: {
      name: 'Paris',
      latitude: 48.85,
      longitude: 2.35,
      nb_population: 100000,
      nb_doctors: 100,
    },
  };
  const res = mockResponse();

  jest.spyOn(City, 'create').mockImplementation(() => {
    throw new Error('Create failed');
  });

  await createCity(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Create failed' });

  City.create.mockRestore();
});

it('should handle error in deleteCity', async () => {
  const fakeId = new mongoose.Types.ObjectId();

  jest.spyOn(City, 'findByIdAndDelete').mockImplementation(() => {
    throw new Error('DB error');
  });

  await expect(deleteCity(fakeId)).rejects.toThrow(
    'Error deleting city: DB error',
  );

  City.findByIdAndDelete.mockRestore();
});
