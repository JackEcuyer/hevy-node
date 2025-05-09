import { ZodError } from "zod";

export class ValidationError extends Error {
  public zodError: ZodError;

  constructor(error: ZodError) {
    // Format error messages into a single string for readability
    const formatted = error.errors.map(
      (e) => `${e.path.join(".") || "value"}: ${e.message}`,
    );

    super(`Validation failed:\n${formatted.join("\n")}`);

    this.name = "ValidationError";
    this.zodError = error;
  }
}
