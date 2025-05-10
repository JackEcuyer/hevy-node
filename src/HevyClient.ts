import { Workouts } from "./workouts";

/**
 * Entry point for the Hevy SDK.
 * It provides access to various sections of the API, such as workouts, by exposing them as properties.
 *
 * To use the SDK, import the `HevyClient` class and initialize it with your API key.
 *
 * @example
 * ```ts
 * import { HevyClient } from 'hevy-sdk';
 *
 * const client = new HevyClient('your-api-key');
 * ```
 */
export class HevyClient {
  /**
   * The API Key used for authentication with the Hevy API.
   * This key is required for accessing the API sections.
   */
  public apiKey: string;
  /** Exposes the `Workouts` section, which allows users to interact with workout-related functionality in the API. */
  public workouts: Workouts;

  /**
   * Creates an instance of the HevyClient.
   * Initializes the client with the provided API key and exposes various API sections (e.g. `workouts`).
   * @param apiKey - The API key used for authenticating requests to the Hevy API.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey; // Store api in client for access in section classes.
    // Instantiate API section classes, allowing the user to interact with each section through `client.{SectionName}.`
    this.workouts = new Workouts(this);
  }
}
