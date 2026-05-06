const frequencyType = Object.freeze({
  ONCE_DAILY: "once_daily",
  TWICE_DAILY: "twice_daily",
  THREE_TIMES_DAILY: "three_times_daily",
  AS_NEEDED: "as_needed",
});

const frequencyTypeValues = Object.values(frequencyType);

module.exports = {
  frequencyTypeValues,
  frequencyType,
};
