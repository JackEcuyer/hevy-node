import { HevyClient } from "./HevyClient";
import { APIRequest } from "./APIRequest";

// The Workouts class is used to interact with the workouts section of the API.
export class Workouts {
  // Store the instance of HevyClient to use for making API requests.
  private hevyClient: HevyClient;

  // Constructor accepts an instance of HevyClient for API interaction.
  constructor(client: HevyClient) {
    this.hevyClient = client;
  }

  // Method use to retrieve a list of workouts
  public async getWorkouts(page: number, pageSize: number) {
    // Validate that page and pageSize are integers greater than 0
    if (!Number.isInteger(page) || page <= 0) {
      throw new Error("Page must be a positive integer greater than 0");
    }
    if (!Number.isInteger(pageSize) || pageSize <= 0) {
      throw new Error("Page size must be a positive integer greater than 0");
    }

    try {
      // Use APIRequest helper to send GET request
      const response = await APIRequest(
        `https://api.hevy.com/v1/workouts`,
        "GET",
        null,
        this.hevyClient.apiKey
      );
      return response; // Return the workout response data
    } catch (error) {
      throw error; // Propagate the error
    }
  }
}
