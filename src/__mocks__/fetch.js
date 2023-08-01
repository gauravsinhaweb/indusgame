export const mockFetch = (responseData, responseStatus = 200) =>
  jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(responseData),
      status: responseStatus,
    })
  );
