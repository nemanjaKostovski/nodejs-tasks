import { validateInput, shortenPublicHoliday } from './helpers';

const data = {
  year: 2024,
  country: 'GB',
};

describe('Helpers', () => {
  describe('validateInput', () => {
    test('successfully validates input with valid data', () => {
      expect(() => validateInput(data)).not.toThrow();
    });

    test('throws an error for invalid country', () => {
      const invalidData = { ...data, country: 'InvalidCountry' };
      expect(() => validateInput(invalidData)).toThrow(
        'Country provided is not supported, received: InvalidCountry'
      );
    });

    test('throws an error for invalid year', () => {
      const invalidData = { ...data, year: 2023 };
      expect(() => validateInput(invalidData)).toThrow(
        'Year provided not the current, received: 2023'
      );
    });
  });

  describe('shortenPublicHoliday', () => {
    test('successfully shortens public holiday', () => {
      const holiday = {
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
        countryCode: 'US',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['National holiday'],
      };
      const shortenedHoliday = shortenPublicHoliday(holiday);
      expect(shortenedHoliday).toEqual({
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
      });
    });
  });
});
