module.exports = (log_str, params) => {
  params
    ? console.log(log_str, ...params)
    : console.log(log_str + '  ' + new Date().toLocaleString())
};
