const tax_rate = '0.085';
const stripe_fee_base = '30';
const stripe_fee_rate = '0.03';

exports.getCarportDataWithFees = async (request, response, store) => {
  const {carport_id} = request.body;
  try {
    const document = await store.doc(`carports/${carport_id}`).get();
    if (document.exists) {
      response.status(200).send({
        ...document.data(),
        tax_rate: tax_rate,
        stripe_fee_base: stripe_fee_base,
        stripe_fee_rate: stripe_fee_rate,
      });
    } else {
      response.send('CARPORT DOES NOT EXIST');
    }
  } catch (error) {
    console.error('COULD NOT RETRIEVE CARPORT', carport_id);
    response.status(400).send(`COULD NOT RETRIEVE CARPORT ${carport_id}`);
  }

  return;
};

exports.calculateParkingPrices = async (request, response, store) => {
  const {carport_id, hours} = request.body;
  try {
    const document = await store.doc(`carports/${carport_id}`).get();
    if (document.exists) {
      const {price_hr} = document.data();
      const base_price = parseInt(price_hr, 10) * 100 * parseInt(hours, 10);
      const tax_fee = parseInt(
        parseFloat(tax_rate) * parseFloat(base_price),
        10,
      );
      const stripe_fee = parseInt(
        parseFloat(stripe_fee_base) + parseFloat(stripe_fee_rate) * base_price,
        10,
      );
      const total_price = base_price + tax_fee;
      const total_price_stripe = base_price + tax_fee + stripe_fee;
      response.status(200).send({
        subtotal: base_price,
        fees: tax_fee + stripe_fee,
        total_price: total_price_stripe,
      });
    } else {
      response.status(400).send('COULD NOT FIND CARPORT');
    }
  } catch (error) {
    console.error('COULD NOT CALCULATE PARKING PRICES');
  }
};
