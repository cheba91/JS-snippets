const daysInYear = (() => {
  const year = new Date().getFullYear();
  const isLeap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  return isLeap ? 366 : 365;
})();

const makeString = (arr) => {
  const first = arr.slice(0, arr.length - 1);
  const last = arr[arr.length - 1];
  return first.join(', ') + ' and ' + last + ' ';
};
