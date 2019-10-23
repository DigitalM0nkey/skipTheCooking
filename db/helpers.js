const countArray = (cookie) => {
  let count = {};
  cookie.forEach(function(i) {
    count[i] = (Number(count[i]) || 0) + 1;
  });
  return count;
};
exports.countArray = countArray;
