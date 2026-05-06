const { z } = require("zod");

const { errorConstants } = require("../constants/errorConstants");
const { foodTypeValues } = require("../enums/foodType");
const { frequencyTypeValues } = require("../enums/frequencyType");
const { medicationTypeValues } = require("../enums/medicationType");
const { bestTakenValues } = require("../enums/bestTakenType");

/* ---------------- COMMON FIELDS ---------------- */
const medicationNameField = z
  .string(errorConstants.MEDICATION_NAME_REQUIRED)
  .trim()
  .min(2, errorConstants.NAME_SHORT)
  .max(255, errorConstants.NAME_LONG);

const prescribedByField = z
  .string()
  .trim()
  .max(255, errorConstants.NAME_TOO_LONG)
  .optional()
  .nullable();

const doseField = z.string().trim().max(100, errorConstants.DOSE_LONG).optional().nullable();

const dateField = z.coerce.date({
  invalid_type_error: errorConstants.INVALID_DATE,
  required_error: errorConstants.DATE_REQUIRED,
});

/* ---------------- CREATE SCHEMA ---------------- */
const createMedicationSchema = z
  .object({
    medicationName: medicationNameField,
    medicationType: z.enum(medicationTypeValues, {
      required_error: errorConstants.MEDICATION_TYPE_REQUIRED,
      invalid_type_error: errorConstants.INVALID_TYPE,
    }),
    prescribedBy: prescribedByField,
    dosePerIntake: doseField,
    frequency: z.enum(frequencyTypeValues, {
      required_error: errorConstants.FREQUENCY_REQUIRED,
    }),
    bestTaken: z.array(z.enum(bestTakenValues)).min(1, errorConstants.ONE_REQUIRED).optional(),
    withFood: z.enum(foodTypeValues).optional(),
    startDate: dateField,
    endDate: dateField.optional().nullable(),
    ongoing: z.boolean().default(false),
    pillsRemaining: z.number().int().min(0, errorConstants.NOT_NEGATIVE).optional(),
    doseReminders: z.boolean().default(false),
    refillAlert: z.boolean().default(false),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .strict()
  .refine(
    (data) => {
      if (data.ongoing && data.endDate) return false;
      return true;
    },
    {
      message: errorConstants.END_DATE_NULL,
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (!data.ongoing && !data.endDate) return false;
      return true;
    },
    {
      message: errorConstants.END_DATE_REQUIRED,
      path: ["endDate"],
    },
  );

/* ---------------- UPDATE SCHEMA ---------------- */
const updateMedicationSchema = z
  .object({
    medicationName: medicationNameField.optional(),
    medicationType: z.enum(medicationTypeValues).optional(),
    prescribedBy: prescribedByField,
    dosePerIntake: doseField,
    frequency: z.enum(frequencyTypeValues).optional(),
    bestTaken: z.array(z.enum(bestTakenValues)).optional(),
    withFood: z.enum(foodTypeValues).optional(),
    startDate: dateField.optional(),
    endDate: dateField.optional().nullable(),
    ongoing: z.boolean().optional(),
    pillsRemaining: z.number().int().min(0).optional(),
    doseReminders: z.boolean().optional(),
    refillAlert: z.boolean().optional(),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .strict();

/* ---------------- LIST QUERY ---------------- */
const listMedicationQuerySchema = z
  .object({
    limit: z.coerce.number().int().positive().max(100).default(10),
    page: z.coerce.number().int().positive().default(1),
    search: z.string().trim().optional(),
    sortBy: z.string().trim().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict()
  .transform((data) => ({
    ...data,
    offset: (data.page - 1) * data.limit,
  }));

module.exports = {
  createMedicationSchema,
  updateMedicationSchema,
  listMedicationQuerySchema,
};
