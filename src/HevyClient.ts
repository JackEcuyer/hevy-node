import { Workouts } from "./Workouts";

// The HevyClient class serves as the main entry point for users to interact with the Hevy API.
export class HevyClient {
  // Exposes API Key for use via section classes.
  public apiKey: string;
  // Exposes various API sections, allowing users to access their functionalities.
  public Workouts: Workouts;

  // Constructor for initializing the HevyClient instance with an API key.
  constructor(apiKey: string) {
    this.apiKey = apiKey; // Store api in client for access in section classes.
    // Instantiate API section classes, allowing the user to interact with each section through `client.{SectionName}.`
    this.Workouts = new Workouts(this);
  }
}
