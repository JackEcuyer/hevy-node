/*
 * A utility function for making HTTP requests to the API.
 * This function simplifies the process of sending requests by handling common
 * configurations such as setting headers (e.g., API key) and converting data
 * to JSON format.
 */
export const APIRequest = async (
  url: string,
  method: string = "GET",
  data: Record<string, unknown> | null = null,
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
    // Ensure content type header is added when request contains a payload
    (config.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  // Send request to Hevy API
  const response = await fetch(url, config);

  // Check if the response is successful (status 2xx)
  if (!response.ok) {
    // Unsuccessful response, handle errors

    // Handle invalid API key (401 Unauthorized)
    if (response.status === 401) {
      throw new Error(`API Request failed: Invalid API Key`);
    }

    // Initially parse response as text to cater for certain error messages that are not returned in JSON format
    const responseText = await response.text();

    // Attempt to parse response text as JSON
    try {
      const errorJSON = JSON.parse(responseText);
      // Successfully parsed as JSON, error message will be in the "error" property
      throw new Error(
        `API Request failed: ${errorJSON.error || response.statusText}`
      );
    } catch {
      // Failed to parse as JSON, error must be plain response text
      throw new Error(
        `API Request failed: ${responseText || response.statusText}`
      );
    }
  }

  // Return the parsed JSON response
  const responseData = await response.json();
  return responseData;
};
