export function calculateParkingCosts(hourly_price, hrs) {
  const hours = hrs ? hrs : 1;
  const base_price = hourly_price * 100 * hours;
  const tax_fee = parseInt(base_price * 0.085, 10);
  const stripe_fee = 30 + parseInt((base_price + tax_fee) * 0.03, 10);
  const total_price = base_price + tax_fee;
  const total_price_stripe = base_price + tax_fee + stripe_fee;

  return {
    base_price,
    tax_fee,
    stripe_fee,
    total_price,
    total_price_stripe,
  };
}

module.exports.calculateParkingCosts = calculateParkingCosts;
