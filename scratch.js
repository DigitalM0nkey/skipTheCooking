const contArray = (cookie) => {
  let count = {};
  cookie.forEach(function(i) {
    count[i] = (Number(count[i]) || 0) + 1;
  });
  console.log(count);
};
