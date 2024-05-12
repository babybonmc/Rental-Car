const { calculateRentalPrice, getCarClass, getRentalDays, getRentalSeason } = require('./rentalPrice');
const assert = require('assert');

describe('calculateRentalPrice', () => {
  it('should return error message for license duration less than 1 year', () => {
    const result = calculateRentalPrice('2023-01-01', '2023-06-01', 25, 5, 'Low', 'Compact');
    assert.strictEqual(result, "Individuals holding a driver's license for less than a year are ineligible to rent.");
  });

  it('should calculate rental price without adjustments for normal conditions', () => {
    const result = calculateRentalPrice('2019-01-01', '2025-01-01', 30, 5, 'Low', 'Compact');
    assert.strictEqual(result, "$150");
  });

  it('should increase price by 30% for license duration less than 2 years', () => {
    const result = calculateRentalPrice('2023-01-01', '2024-01-01', 30, 5, 'Low', 'Compact');
    assert.strictEqual(result, "$195");
  });

  it('should add 15 euros to the daily rental price for license duration less than 3 years and high season', () => {
    const result = calculateRentalPrice('2022-01-01', '2024-01-01', 30, 5, 'High', 'Compact');
    assert.strictEqual(result, "$225");
  });

  it('should increase price by 50% for Racer car class, driver age <= 25, and high season', () => {
    const result = calculateRentalPrice('2022-01-01', '2024-01-01', 25, 5, 'High', 'Racer');
    assert.strictEqual(result, "$337.5");
  });

  it('should increase price by 15% for high season', () => {
    const result = calculateRentalPrice('2020-01-01', '2024-01-01', 30, 5, 'High', 'Compact');
    assert.strictEqual(result, "$172.5");
  });

  it('should decrease price by 10% for rental days more than 10 and low season', () => {
    const result = calculateRentalPrice('2020-01-01', '2024-01-01', 30, 15, 'Low', 'Compact');
    assert.strictEqual(result, "$607.5");
  });
});
describe('getCarClass', () => {
    it('should return "Compact" for carClass "Compact"', () => {
      const result = getCarClass('Compact');
      assert.strictEqual(result, 'Compact');
    });
  
    it('should return "Electric" for carClass "Electric"', () => {
      const result = getCarClass('Electric');
      assert.strictEqual(result, 'Electric');
    });
  
    it('should return "Cabrio" for carClass "Cabrio"', () => {
      const result = getCarClass('Cabrio');
      assert.strictEqual(result, 'Cabrio');
    });
  
    it('should return "Racer" for carClass "Racer"', () => {
      const result = getCarClass('Racer');
      assert.strictEqual(result, 'Racer');
    });
  
    it('should return "Unknown" for unknown carClass', () => {
      const result = getCarClass('SUV');
      assert.strictEqual(result, 'Unknown');
    });
  });
  describe('getRentalDays', () => {
    it('should return 1 for same pickup and dropoff date', () => {
      const result = getRentalDays('2024-05-12', '2024-05-12');
      assert.strictEqual(result, 1);
    });
  
    it('should return correct number of days for different pickup and dropoff dates', () => {
      const result = getRentalDays('2024-05-12', '2024-05-15');
      assert.strictEqual(result, 4);
    });
  });
  describe('getRentalSeason', () => {
    it('should return "High" for high season dates', () => {
      const result = getRentalSeason('2024-05-01', '2024-06-01');
      assert.strictEqual(result, 'High');
    });
  
    it('should return "Low" for low season dates', () => {
      const result = getRentalSeason('2024-01-01', '2024-02-01');
      assert.strictEqual(result, 'Low');
    });
  
    it('should return "High" for mixed high and low season dates', () => {
      const result = getRentalSeason('2024-04-01', '2024-11-01');
      assert.strictEqual(result, 'High');
    });
  });
      