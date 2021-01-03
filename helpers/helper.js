import moment from 'moment';

export function getBoundaryFromPoint(lat, lng, rad) {
  const one_lat_mi = 0.0145554051;
  lat = parseFloat(lat);
  lng = parseFloat(lng);

  const long = 1 / (Math.cos((lat * Math.PI) / 180) * 69.172);

  console.log('long', long);
  let min_lat = lat - one_lat_mi * rad;
  let max_lat = lat + one_lat_mi * rad;
  let min_lng = lng - long * rad;
  let max_lng = lng + long * rad;

  if (max_lng > 180) {
    max_lng = parseFloat(max_lng) - 360;
  }
  if (min_lng < -180) {
    min_lng = parseFloat(min_lng) + 360;
  }
  console.log({
    min_lat,
    max_lat,
    min_lng,
    max_lng,
  });

  return {
    min_lat,
    max_lat,
    min_lng,
    max_lng,
  };
}

export function combineString(strings) {
  return strings.join(' ');
}

export function distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var dlat1 = toRad(lat1);
  var dlat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  // console.log("distance in km", d)
  return convertKmToMiles(d).toFixed(2);
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

function convertKmToMiles(km) {
  return km * 0.621371;
}

export function splitStrByComma(str) {
  var splitStr = str.split(',');
  return splitStr;
}

export function splitExpirationDate(str) {
  var splitStr = str.split('/');
  return {
    month: splitStr[0],
    year: splitStr[1],
  };
}

export function convertToDollar(number) {
  if (number) {
    return parseFloat(number).toFixed(2);
  }
  return number;
}

export function convertToHour(ms) {
  return Math.floor(parseInt(ms, 10) / 3600000);
}

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function getTimePeriod() {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 12) {
    return 'Morning';
  } else if (hours >= 12 && hours < 17) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

export function isInBetween(start, end) {
  const returnvalue = moment().isBetween(
    moment(start, 'HH:mm'),
    moment(end, 'HH:mm'),
  );
  console.log(returnvalue);
  return returnvalue;
}

//calculate tax and stripe fees
export function calculateFees(amount) {
  amount = parseInt(amount, 10);
  return parseInt(amount * 0.0875 + (amount * 0.03 + 30), 10);
}

export function millisecondsToHours(ms) {
  return Math.round((ms / 1000 / 60 / 60) * 100) / 100;
}

export function setTwoDigit(number) {
  if (parseInt(number, 10) > 0) {
    return ('0' + number).slice(-2);
  } else {
    return '00';
  }
}

export function getNested(theObject, path, separator) {
  try {
    separator = separator || '.';

    return path
      .replace('[', separator)
      .replace(']', '')
      .split(separator)
      .reduce(function(obj, property) {
        return obj[property];
      }, theObject);
  } catch (err) {
    return undefined;
  }
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(pw1, pw2) {
  if (pw1 !== pw2) {
    return false;
  }
  if (pw1.length < 8) {
    return false;
  }
  return true;
}

export function getPortMaxHours(port, defaultHours) {
  let maxHours = defaultHours;
  if (port.schedule) {
    if (port.schedule.enabled) {
      if (port.schedule.end) {
        maxHours = moment(port.schedule.end, 'HH:mm').diff(moment(), 'hours');
        console.log('MAX SCHEDULE HOURS => ', maxHours);
        return maxHours;
      }
    }
  }
  if (port.timer_end) {
    maxHours = moment(port.timer_end, 'X').diff(moment(), 'hours');
    console.log('MAX HOURS => ', maxHours);
  }
  return maxHours;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isNumber(string) {
  return /^\d+$/.test(string);
}

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

export function calculateParkingCostsV2(port, hours) {
  const {tax_rate, stripe_fee_base, stripe_fee_rate, price_hr} = port;
  console.log('CALC', port);

  const base_price = parseInt(parseFloat(price_hr) * 100 * hours, 10);
  const tax_fee = parseInt(parseFloat(tax_rate) * parseFloat(base_price), 10);
  const stripe_fee = parseInt(
    parseFloat(stripe_fee_base) + parseFloat(stripe_fee_rate) * base_price,
    10,
  );
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
