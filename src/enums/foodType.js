const foodType = Object.freeze({
  WITH_FOOD: "with_food",
  BEFORE_FOOD: "before_food",
  AFTER_FOOD: "after_food",
  EMPTY_STOMACH: "empty_stomach",
});

const foodTypeValues = Object.values(foodType);

module.exports = {
  foodTypeValues,
  foodType,
};
