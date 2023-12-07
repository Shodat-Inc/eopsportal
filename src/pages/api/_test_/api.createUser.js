import { createMocks } from "node-mocks-http";
import { apiHandler } from "../../../helpers/api/api-handler";

describe("/api/createUsers", () => {
  test("creates a new user", async () => {
    // Mock request body with valid data
    const validRequestBody = {
      email,
      firstName,
      lastName,
      companyName,
      countryCodeId,
      phoneNumber,
      password,
      isPrimary,
      primary,
      roleId,
    };

    const { req, res } = createMocks({
      method: "POST",
      body: req.body,
    });

    // Call the API handler
    await apiHandler(req, res);

    // Check the response status and body
    expect(res.statusCode).toBe(201); // Adjust the expected status code based on your API logic

    // You might want to adjust the expectation based on your API response structure
    expect(JSON.parse(res._getData())).toEqual([]);
  });

  // Add more test cases for validation errors, different scenarios, etc.
});
