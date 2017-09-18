// const ERRORS = {
//   METRIC_NOT_DEFINED: metricName =>
//     `Trying to format a metric but could not find metric ${metricName} in InfoService.`,
//   METRIC_FORMAT_NOT_FOUND: (metricName, metricFormat) =>
//     `${_.toUpper(metricFormat)} format (for ${metricName}) does not have a filter associated with it.`
// };

// These are basic filter type functions named semantically
const filterTypes = {
  percentage: (val, precision = 2, preformatter = _.identity) =>
    `${preformatter(_.round(val, precision))}%`,
  simpleNumeric: (val, precision, preformatter = _.identity) =>
    preformatter(_.round(val, precision)),
  // TODO: may want to get our precision back
  centsToDollar: (val, precision = 2, preformatter = _.identity) => {
    const number = preformatter(_.round(val / 100, precision));
    return `$${number && _.isNumber(number) ? number.toFixed(2) : number}`;
  },
  dollarFormatted: (val, precision, preformatter = _.identity) =>
    `$${preformatter(_.round(val, precision))}`,
  date: val => moment(val).format('MM/DD/YY hh:mm a')
};
const DEFAULT_SIG_DIGS = 2;

const DEFAULT_FILTER = originalValue =>
  _.isNumber(originalValue) ? bigNumber(_.round(originalValue, DEFAULT_SIG_DIGS)) : originalValue;

// This is our format lookup table
export const filterTable = {
  // Dollar formatted (will show as dollars if necessary)
  // Example: 103 => $1.03
  'dollar': filterTypes.centsToDollar,
  // Percentages
  // Example: 0.1 => 10%
  '%': filterTypes.percentage,
  'percentage': filterTypes.percentage,
  // Simple Numeric Filter (uses bigInt)
  'numeric': filterTypes.simpleNumeric,
  'number': filterTypes.simpleNumeric,
  'date': filterTypes.date
};

const bigNumber = number => {
  const format = (exp, suffix) => `${(number / Math.pow(10, exp)).toFixed(1)} ${suffix}`;
  if (number) {
    const abs = Math.abs(number);
    if (abs >= Math.pow(10, 12)) {
      return format(12, 'T');
    } else if (abs >= Math.pow(10, 9)) {
      return format(9, 'B');
    } else if (abs >= Math.pow(10, 6)) {
      return format(6, 'M');
    } else if (abs >= Math.pow(10, 3)) {
      return format(3, 'K');
    }
  }
  return number;
};

const smallNumber = number => {
  if (_.isNumber(number)) {
    if (number >= 90) {
      return '90+';
    } else if (number >= 50) {
      return '50+';
    } else if (number >= 40) {
      return '40+';
    } else if (number >= 30) {
      return '30+';
    } else if (number >= 20) {
      return '20+';
    } else if (number > 10) {
      return '10+';
    } else {
      return number;
    }
  } else {
    return 0;
  }
};

const validateFormat = _.identity;
const numberFilter = (originalValue, displayFormat, metricName, precision) => {
  displayFormat = validateFormat(displayFormat);
  precision = displayFormat === 'dollar' && _.inRange(originalValue, -1000, 1000) ? 2 : parseInt(precision);

  return displayFormat && !_.isNaN(parseFloat(originalValue)) ? filterTable[displayFormat](
    parseFloat(originalValue),
    _.isNaN(precision) ? DEFAULT_SIG_DIGS : precision,
    bigNumber
  ) : DEFAULT_FILTER(originalValue);
};

const titleFilter = (originalValue, displayFormat) => {
  displayFormat = validateFormat(displayFormat);
  return displayFormat ? filterTable[displayFormat](
    parseFloat(originalValue),
    10
  ) : DEFAULT_FILTER(originalValue);
};

const unitNumbers = number => `0${number}`.slice(-2);

export {
  numberFilter,
  bigNumber,
  smallNumber,
  unitNumbers,
  titleFilter
};
