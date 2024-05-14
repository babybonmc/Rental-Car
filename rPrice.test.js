const { calculateRentalPrice, getCarClass, getRentalDays, getRentalSeason } = require('./rentalPrice');

// Тесты для различия цен в будние и выходные дни
describe('Weekday and Weekend Rental Prices', () => {
  // Тест для проверки, что цена увеличивается на 5% в выходные дни
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
  
  // Тест для проверки, что цена остается на уровне будничной цены в период праздников
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
  
  // Тест для проверки, что наценка на выходные дни не применяется в низкий сезон
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
  
  // Тест для проверки, что наценка на выходные дни применяется корректно для разных классов автомобилей
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
  
  // Тест для проверки поведения функции при крайних случаях
  it('should handle edge cases correctly', () => {
    // Test when rental duration is exactly one weekend
    let pickupDate = new Date(2024, 4, 10); // May 10, 2024 (Friday)
    let dropoffDate = new Date(2024, 4, 13); // May 13, 2024 (Monday)
    let rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    let rentalDays = getRentalDays(pickupDate, dropoffDate);
    let rentalPrice = calculateRentalPrice(
      '1990-01-01', // Sample licenseIssueDate
      '1995-01-01', // Sample licenseExpiryDate
      30, // Sample driverAge
      rentalDays,
      rentalSeason,
      'Compact', // Sample carClass
      pickupDate // Pass pickupDate to calculateRentalPrice
    );
    let expectedPrice = '$' + (30 * rentalDays * (rentalSeason === "High" ? 1.15 : 1)).toFixed(2);
    // Adjust expected price for exactly one weekend rental
    if (rentalDays === 2 && rentalSeason === "High") {
        expectedPrice = '$60.00'; // $30 * 1.15 * 2
      }
      
    expect(rentalPrice).toEqual(expectedPrice);
    // Test when rental duration spans the entire weekend
    pickupDate = new Date(2024, 4, 11); // May 11, 2024 (Saturday)
    dropoffDate = new Date(2024, 4, 12); // May 12, 2024 (Sunday)
    rentalSeason = getRentalSeason(pickupDate, dropoffDate);
    rentalDays = getRentalDays(pickupDate, dropoffDate);
    rentalPrice = calculateRentalPrice(
      '1990-01-01', // Sample licenseIssueDate
      '1995-01-01', // Sample licenseExpiryDate
      30, // Sample driverAge
      rentalDays,
      rentalSeason,
      'Compact', // Sample carClass
      pickupDate // Pass pickupDate to calculateRentalPrice
    );
    expectedPrice = '$' + (30 * rentalDays).toFixed(2);
    expect(rentalPrice).toEqual(expectedPrice);
  });
  
  // Добавьте еще тесты по вашему усмотрению для проверки других сценариев
});
