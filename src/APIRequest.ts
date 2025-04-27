/*
 * A utility function for making HTTP requests to the API.
 * This function simplifies the process of sending requests by handling common
 * configurations such as setting headers (e.g., API key) and converting data
 * to JSON format.
 */
export const APIRequest = async (
  url: string,
  method: string = "GET",
  data: Record<string, any> | null = null,
  apiKey: string
) => {
  // Setup request configuration
  const config: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      "API-Key": apiKey, // Add API key to header
    },
  };

  // If there is data (for POST/PUT), add it to the request body
  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    // Send request to Hevy API
    const response = await fetch(url, config);

    // Check if the response is successful (status 2xx)
    if (!response.ok) {
      // Unsuccessful response, handle error
      const error = await response.json();
      throw new Error(
        `API Request failed: ${error.message || response.statusText}`
      );
    }

    // Return the parsed JSON response
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error; // Re-throw to be handled by the caller
  }
};
