import { HevyClient } from "../src/HevyClient";

describe("Hevy Client Creation", () => {
  const client = new HevyClient("");
  it(`Should return 'Invalid API Key' when invalid API key is provided`, async () => {
    await expect(client.workouts.getWorkouts(1, 10)).rejects.toThrow(
      "Invalid API Key"
    );
  });
});
