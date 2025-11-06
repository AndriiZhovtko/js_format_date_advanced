'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const dateValues = {};

  for (let i = 0; i < 3; i++) {
    dateValues[fromFormat[i]] = dateParts[i];
  }

  const currentYearKey = Object.keys(dateValues).find((key) =>
    key.includes('Y'));
  let yearValue = dateValues[currentYearKey];

  const targetYearKey = toFormat.find((key) => key.includes('Y'));

  const dayValue = dateValues[fromFormat.find((key) => key.includes('D'))];
  const monthValue = dateValues[fromFormat.find((key) => key.includes('M'))];

  if (currentYearKey === 'YYYY' && targetYearKey === 'YY') {
    yearValue = yearValue.slise(-2);
  }

  if (currentYearKey === 'YY' && targetYearKey === 'YYYY') {
    const shortYear = parseInt(yearValue, 10);

    if (shortYear <= 29) {
      yearValue = `20${yearValue}`;
    } else {
      yearValue = `19${yearValue}`;
    }
  }

  const toSeparator = toFormat[toFormat.length - 1];

  const finalParts = [];
  const toPlaceholders = toFormat.slice(0, 3);

  for (const placeholder of toPlaceholders) {
    if (placeholder.includes('Y')) {
      finalParts.push(yearValue);
    } else if (placeholder.includes('D')) {
      finalParts.push(dayValue);
    } else if (placeholder.includes('M')) {
      finalParts.push(monthValue);
    }
  }

  return finalParts.join(toSeparator);
}

module.exports = formatDate;
