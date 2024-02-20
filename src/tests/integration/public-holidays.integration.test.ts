import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from '../../services/public-holidays.service';

describe('Integration Tests - Public Holidays Service', () => {
  test('fetches list of public holidays for a specific year and country', async () => {
    const year = 2024;
    const country = 'GB';

    const result = await getListOfPublicHolidays(year, country);
    expect(result).toHaveLength(13);
  });
  test('checks if today is a public holiday for a specific country', async () => {
    const country = 'GB';

    const result = await checkIfTodayIsPublicHoliday(country);
    expect(result).toBe(false);
  });
  test('fetches next public holidays for a specific country', async () => {
    const country = 'GB';

    const result = await getNextPublicHolidays(country);
    expect(result).toHaveLength(13);
  });
});
