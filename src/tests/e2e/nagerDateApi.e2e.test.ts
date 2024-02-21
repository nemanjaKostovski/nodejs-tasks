const request = require('supertest');

const baseUrl = 'https://date.nager.at';

describe('E2E Tests - Nager.Date API Endpoints', () => {
  test('GET /api/v3/CountryInfo/{countryCode} should return country info', async () => {
    const countryCode = 'GB';
    const response = await request(baseUrl).get(
      `/api/v3/CountryInfo/${countryCode}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('commonName');
    expect(response.body).toHaveProperty('officialName');
    expect(response.body).toHaveProperty('region');
    expect(response.body).toHaveProperty('borders');
    expect(response.body).toHaveProperty('countryCode', countryCode);
  });

  test('GET /api/v3/AvailableCountries should return all available countries', async () => {
    const response = await request(baseUrl).get('/api/v3/AvailableCountries');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
