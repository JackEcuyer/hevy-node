import { HevyClient } from "../src/HevyClient";

const client = new HevyClient(process.env.HEVY_API_KEY || "");

describe("Workouts API Tests", () => {
  // All tests relating to getWorkouts
  describe("getWorkouts", () => {
    it("Should return a list of workouts", async () => {
      const workouts = await client.workouts.getWorkouts(1, 10);
      expect(workouts).toBeDefined;
    });
    it("Should return invalid page number when trying to list workouts with an invalid page number", async () => {
      await expect(client.workouts.getWorkouts(0, 10)).rejects.toThrow(
        "Page must be a positive integer greater than 0"
      );
    });
    it("Should return invalid page size when trying to list workouts with an invalid page size", async () => {
      await expect(client.workouts.getWorkouts(1, 11)).rejects.toThrow(
        "Page size must be a positive integer greater than 0 and no more than 10"
      );
    });
  });
  // All tests relating to getWorkoutCount
  describe("getWorkoutCount", () => {
    it("Should return total number of workouts on account", async () => {
      const workoutCount = await client.workouts.getWorkoutCount();
      expect(typeof workoutCount).toBe("number");
    });
  });
  // All tests relating to getWorkout
  describe("getWorkout", () => {
    it("Should return 'Workout ID is required' when calling getWorkout without providing a workout ID", async () => {
      await expect(client.workouts.getWorkout("")).rejects.toThrow(
        "Workout ID is required"
      );
    });
    it("Should return 'API Request failed: Workout not found' when trying to retrieve workout with an invalid ID", async () => {
      await expect(client.workouts.getWorkout("invalidID")).rejects.toThrow(
        "API Request failed: Workout not found"
      );
    });
    it("Should return workout data for specified valid workout ID", async () => {
      const workoutData = await client.workouts.getWorkout(
        process.env.VALID_WORKOUT_ID || ""
      );
      expect(workoutData).toBeDefined;
    });
  });
});
