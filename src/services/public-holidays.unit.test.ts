import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

jest.mock('axios');

describe('Public Holidays Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('fetches list of public holidays', async () => {
    const mockData = [
      {
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
        countryCode: 'GB',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['National holiday'],
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getListOfPublicHolidays(2024, 'GB');

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/PublicHolidays/2024/GB')
    );
    expect(result).toEqual(
      mockData.map((holiday) => ({
        name: holiday.name,
        localName: holiday.localName,
        date: holiday.date,
      }))
    );
  });

  test('checks if today is a public holiday', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday('GB');

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/IsTodayPublicHoliday/GB')
    );
    expect(result).toBe(true);
  });

  test('fetches next public holidays', async () => {
    const mockData = [
      {
        name: 'New Year',
        localName: 'New Year',
        date: '2024-01-01',
        countryCode: 'GB',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['National holiday'],
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getNextPublicHolidays('GB');

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/NextPublicHolidays/GB')
    );
    expect(result).toEqual(
      mockData.map((holiday) => ({
        name: holiday.name,
        localName: holiday.localName,
        date: holiday.date,
      }))
    );
  });
});
