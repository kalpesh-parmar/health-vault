const medictationType = Object.freeze({
  TABLET: "tablet",
  CAPSULE: "capsule",
  SYRUP: "syrup",
  DROP: "drop",
  INJECTION: "injection",
});

const medicationTypeValues = Object.values(medictationType);

module.exports = {
  medicationTypeValues,
  medictationType,
};
