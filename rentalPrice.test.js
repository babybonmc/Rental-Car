const { calculateRentalPrice } = require('./rentalPrice');

describe('calculateRentalPrice', () => {
  // Test for license duration less than 1 year
  test('should return error message for license duration less than 1 year', () => {
    expect(calculateRentalPrice('2023-01-01', '2023-06-01', 30, 5, 'High', 'Compact'))
      .toBe("Individuals holding a driver's license for less than a year are ineligible to rent.");
  });

  // Test for regular scenario
  test('should calculate rental price correctly for a regular scenario', () => {
    expect(calculateRentalPrice('2020-01-01', '2024-01-01', 35, 7, 'Low', 'Compact'))
      .toBe("$245");
  });

  // Test for license duration less than 2 years
  test('should increase price by 30% for license duration less than 2 years', () => {
    expect(calculateRentalPrice('2023-01-01', '2025-01-01', 40, 5, 'High', 'Electric'))
      .toBe("$338.75");
  });

  // Test for license duration less than 3 years and high season
  test('should add 15 euros to daily rental price for license duration less than 3 years and high season', () => {
    expect(calculateRentalPrice('2022-01-01', '2024-01-01', 28, 3, 'High', 'Cabrio'))
      .toBe("$148.35");
  });

  // Test for racer car, driver age <= 25, and high season
  test('should increase price by 50% for racer car, driver age <= 25, and high season', () => {
    expect(calculateRentalPrice('2021-01-01', '2024-01-01', 23, 2, 'High', 'Racer'))
      .toBe("$79.35");
  });

  // Test for high season
  test('should increase price by 15% for high season', () => {
    expect(calculateRentalPrice('2022-01-01', '2024-01-01', 30, 7, 'High', 'Compact'))
      .toBe("$362.25");
  });

  // Test for rental days more than 10 in low season
  test('should decrease price by 10% for rental days more than 10 in low season', () => {
    expect(calculateRentalPrice('2022-01-01', '2022-01-15', 35, 12, 'Low', 'Compact'))
      .toBe("$378");
  });
});
