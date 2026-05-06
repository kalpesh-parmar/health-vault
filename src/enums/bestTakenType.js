const bestTakenType = Object.freeze({
  MORNING: "morning",
  NOON: "noon",
  EVENING: "evening",
  NIGHT: "night",
});

const bestTakenValues = Object.values(bestTakenType);

module.exports = {
  bestTakenType,
  bestTakenValues,
};
