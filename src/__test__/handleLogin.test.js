import { mockHandleSetCookie } from "../__mocks__/utils";
import { handleLogin } from "../api";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("handleLogin function", () => {
  beforeEach(() => {
    mockHandleSetCookie.mockClear();
  });

  test("should handle successful login", async () => {
    const username = "gaurav.sinha";
    const password = process.env.REACT_APP_GUEST_PASSWORD;
    const setCookie = jest.fn();

    const response = await handleLogin(username, password, setCookie);

    expect(response?.data?.auth).toHaveProperty("accessToken");
    expect(response?.response?.status).toBe(200);
  });

  test("Should return status 400, if credentials are empty", async () => {
    const username = "";
    const password = "";
    const setCookie = jest.fn();

    const response = await handleLogin(username, password, setCookie);

    expect(response?.response?.status).toBe(400);
  });
});
