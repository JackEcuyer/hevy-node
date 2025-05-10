import { HevyClient } from "../HevyClient";
import { APIRequest } from "../api-request";
import { ValidationError } from "../errors";
import { workoutSchema, Workout } from "./workout.schema";

/**
 * The Workouts class is used to interact with the workouts section of the Hevy API.
 * It provides methods for retrieving, creating, and managing workouts on the account.
 */
export class Workouts {
  // Store the instance of HevyClient to use for making API requests.
  private hevyClient: HevyClient;

  // Constructor accepts an instance of HevyClient for API interaction.
  constructor(client: HevyClient) {
    this.hevyClient = client;
  }

  /**
   * Retrieves a list of workouts from the API.
   * @param page - The page number for pagination. Must be a positive integer.
   * @param pageSize - The number of workouts per page. Must be a positive integer and no greater than 10.
   * @returns A list of workouts.
   * @throws Error if the page or pageSize is invalid.
   * @example
   * ```ts
   * import { HevyClient } from 'hevy-sdk';
   *
   * const client = new HevyClient('your-api-key');
   * const workouts = await client.workouts.getWorkouts(1, 10);
   * ```
   */
  public async getWorkouts(page: number, pageSize: number) {
    // Validate that page and pageSize are integers greater than 0
    if (!Number.isInteger(page) || page <= 0) {
      throw new Error("Page must be a positive integer greater than 0");
    }
    if (!Number.isInteger(pageSize) || pageSize <= 0 || pageSize > 10) {
      throw new Error(
        "Page size must be a positive integer greater than 0 and no more than 10",
      );
    }

    // Use APIRequest helper to send GET request
    const response = await APIRequest(
      `https://api.hevy.com/v1/workouts`,
      "GET",
      null,
      this.hevyClient.apiKey,
    );
    return response; // Return the workout response data
  }

  /**
   * Retrieves the total number of workouts on the account.
   * @returns The total workout count.
   * @throws Error if the API request fails.
   * @example
   * ```ts
   * import { HevyClient } from 'hevy-sdk';
   *
   * const client = new HevyClient('your-api-key');
   * const count = await client.workouts.getWorkoutCount();
   * ```
   */
  public async getWorkoutCount() {
    // Use APIRequest helper to send GET request
    const response = await APIRequest(
      `https://api.hevy.com/v1/workouts/count`,
      "GET",
      null,
      this.hevyClient.apiKey,
    );
    // return the number of workouts, in 'workout_count' property
    return response.workout_count;
  }

  /**
   * Retrieves a specific workout by workoutID.
   * @param workoutID - The unique ID of the workout to retrieve.
   * @returns The workout data for the specified workout ID.
   * @throws Error if the workoutID is invalid or missing.
   * @example
   * ```ts
   * import { HevyClient } from 'hevy-sdk';
   *
   * const client = new HevyClient('your-api-key');
   * const workout = await client.workouts.getWorkoutByID("workout-id");
   * ```
   */
  public async getWorkoutByID(workoutID: string) {
    // Remove whitespace from start & end of ID
    workoutID = workoutID.trim();
    // Ensure an ID has been provided
    if (!workoutID) {
      throw new Error("Workout ID is required");
    }
    // Use APIRequest helper to send GET request
    const response = await APIRequest(
      `https://api.hevy.com/v1/workouts/${workoutID}`,
      "GET",
      null,
      this.hevyClient.apiKey,
    );
    // return workout data
    return response;
  }

  /**
   * Creates a new workout.
   * @param workout - The workout object to create.
   * @returns The newly created workout data.
   * @throws ValidationError if the provided workout data is invalid.
   * @example
   * ```ts
   * import { HevyClient } from 'hevy-sdk';
   *
   * const client = new HevyClient('your-api-key');
   * const newWorkout = await workouts.createWorkout(validWorkoutObject);
   * ```
   */
  public async createWorkout(workout: Workout) {
    // Validate workout data
    const validationResult = workoutSchema.safeParse(workout);

    // Was data validation successful?
    if (!validationResult.success) {
      throw new ValidationError(validationResult.error);
    }

    const validatedWorkout = validationResult.data;

    // Use APIRequest helper to send POST request
    const response = await APIRequest(
      `https://api.hevy.com/v1/workouts`,
      "POST",
      // Workout data is wrapped in a 'workout' object
      { workout: validatedWorkout },
      this.hevyClient.apiKey,
    );
    // return newly created workout data
    return response;
  }
}
