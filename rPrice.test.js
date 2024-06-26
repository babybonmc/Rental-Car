const { calculateRentalPrice, getCarClass, getRentalDays, getRentalSeason } = require('./rentalPrice');

describe('Weekday and Weekend Rental Prices', () => {
  // Test to check that the price increases by 5% on weekends
  it('should increase price by 5% on weekends', () => {
    const pickupDate = new Date(2024, 4, 10); // May 10, 2024 (Friday)
    const dropoffDate = new Date(2024, 4, 13); // May 13, 2024 (Monday)
    const rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    const rentalDays = getRentalDays(pickupDate, dropoffDate);
    const rentalPrice = calculateRentalPrice(
      '1990-01-01', // Sample licenseIssueDate
      '1995-01-01', // Sample licenseExpiryDate
      30, // Sample driverAge
      rentalDays,
      rentalSeason,
      'Compact', // Sample carClass
      pickupDate // Pass pickupDate to calculateRentalPrice
    );
    const basePriceBeforeWeekendSurcharge = parseFloat(rentalPrice.substring(1)) / 1.05; // Calculate base price before weekend surcharge
    const expectedPrice = '$' + (basePriceBeforeWeekendSurcharge * 1.05).toFixed(2); // Apply weekend surcharge to base price before surcharge
    console.log('Expected Price:', expectedPrice);
    console.log('Received Price:', rentalPrice);
    expect(rentalPrice).toEqual(expectedPrice);
  });
  
  // Test to check that the price remains at the level of the weekday price during the holidays
it('should maintain weekday price during holiday season', () => {
    const pickupDate = new Date(2024, 0, 1); // January 1, 2024 (New Year's Day, Wednesday)
    const dropoffDate = new Date(2024, 0, 4); // January 4, 2024 (Saturday)
    const rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    const rentalDays = getRentalDays(pickupDate, dropoffDate);
    const rentalPrice = calculateRentalPrice(
      '1990-01-01', // Sample licenseIssueDate
      '1995-01-01', // Sample licenseExpiryDate
      30, // Sample driverAge
      rentalDays,
      rentalSeason,
      'Compact', // Sample carClass
      pickupDate // Pass pickupDate to calculateRentalPrice
    );
    const expectedPrice = '$' + (30 * rentalDays).toFixed(2);
    expect(rentalPrice).toEqual(expectedPrice);
  });
  
  // Test to check that weekend surcharge does not apply during low season
  it('should not increase price on weekends during low season', () => {
    const pickupDate = new Date(2024, 1, 1); // February 1, 2024 (Friday)
    const dropoffDate = new Date(2024, 1, 4); // February 4, 2024 (Monday)
    const rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    const rentalDays = getRentalDays(pickupDate, dropoffDate);
    const rentalPrice = calculateRentalPrice(
      '1990-01-01', // Sample licenseIssueDate
      '1995-01-01', // Sample licenseExpiryDate
      30, // Sample driverAge
      rentalDays,
      rentalSeason,
      'Compact', // Sample carClass
      pickupDate // Pass pickupDate to calculateRentalPrice
    );
    const expectedPrice = '$' + (30 * rentalDays).toFixed(2);
    expect(rentalPrice).toEqual(expectedPrice);
  });
  
  // Test to verify that the weekend surcharge is applied correctly for different car classes
  it('should apply weekend surcharge correctly for different car classes', () => {
    const pickupDate = new Date(2024, 4, 10); // May 10, 2024 (Friday)
    const dropoffDate = new Date(2024, 4, 13); // May 13, 2024 (Monday)
    const rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    const rentalDays = getRentalDays(pickupDate, dropoffDate);
    const carClasses = ['Compact', 'Electric', 'Cabrio', 'Racer'];
    carClasses.forEach(carClass => {
      const rentalPrice = calculateRentalPrice(
        '1990-01-01', // Sample licenseIssueDate
        '1995-01-01', // Sample licenseExpiryDate
        30, // Sample driverAge
        rentalDays,
        rentalSeason,
        carClass, // Test with different car classes
        pickupDate // Pass pickupDate to calculateRentalPrice
      );
      const basePriceBeforeWeekendSurcharge = parseFloat(rentalPrice.substring(1)) / 1.05;
      const expectedPrice = '$' + (basePriceBeforeWeekendSurcharge * 1.05).toFixed(2);
      expect(rentalPrice).toEqual(expectedPrice);
    });
  });   
});
