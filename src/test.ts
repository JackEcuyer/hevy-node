import { HevyClient } from "./HevyClient";

// Initialize the client with an API key
const client = new HevyClient("");

// Example of testing the `getWorkouts` method with valid parameters
async function testGetWorkouts() {
  try {
    // Attempt to fetch workouts for the first page with a page size of 10
    const workoutsData = await client.Workouts.getWorkouts(1, 10);
    console.log("Fetched workouts:", workoutsData);
  } catch (error) {
    console.error("Error fetching workouts:", error);
  }
}

// Example of testing invalid parameters
async function testInvalidParams() {
  try {
    // This should fail because page and pageSize should be positive integers greater than 0
    await client.Workouts.getWorkouts(0, 10); // Invalid page
  } catch (error: any) {
    console.log("Expected error for invalid page:", error.message);
  }

  try {
    await client.Workouts.getWorkouts(1, -5); // Invalid pageSize
  } catch (error: any) {
    console.log("Expected error for invalid pageSize:", error.message);
  }
}

// Run the test functions
testGetWorkouts();
testInvalidParams();
