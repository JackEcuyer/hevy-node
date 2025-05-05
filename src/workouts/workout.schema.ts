import { z } from "zod";

// Schema for validating individual sets
const setSchema = z.object({
  type: z.string(),
  weight_kg: z.number().optional(),
  reps: z.number().optional(),
  distance_meters: z.number().optional(),
  duration_seconds: z.number().optional(),
  custom_metric: z.number().optional(),
  rpe: z.number().optional(),
});

// Schema for validating individual exercises
const exerciseSchema = z.object({
  exercise_template_id: z.string(),
  superset_id: z.string().nullable().optional(),
  notes: z.string().optional(),
  sets: z.array(setSchema).optional(),
});

// Main schema for creating or updating a workout
export const workoutSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  start_time: z.date(), // Accepts any valid date format
  end_time: z.date(), // Accepts any valid date format
  is_private: z.boolean(),
  exercises: z.array(exerciseSchema),
});

export type Workout = z.infer<typeof workoutSchema>;
