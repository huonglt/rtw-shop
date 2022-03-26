import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useApi } from "../useApi";

describe("useApi hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hook states are correct initially", async () => {
    const mockApiService = jest.fn();
    const { result } = renderHook(() => useApi(mockApiService));

    const { isLoading, isError, data, loadData } = result.current;

    /**
     * isLoading = false
     * isError = false
     * data = null
     * loadData is a function
     */
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);
    expect(data).toEqual(null);
    expect(loadData instanceof Function).toEqual(true);
  });

  it("api service call success, hook states are correct", async () => {
    const mockApiService = jest.fn().mockResolvedValue("success call");
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi(mockApiService)
    );

    // call method loadData, react states will be updated
    act(() => {
      result.current.loadData();
    });

    // wait for next time the hook render
    await waitForNextUpdate();

    /**
     * states are correct
     */
    const { isLoading, isError, data } = result.current;
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);
    expect(data).toEqual("success call");
  });

  it("api service call fails, hook states are correct", async () => {
    const mockApiService = jest.fn().mockRejectedValue('rejected');
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi(mockApiService)
    );

    // call method loadData, react states will be updated
    act(() => {
      result.current.loadData();
    });

    // wait for next time the hook render
    await waitForNextUpdate();

    /**
     * states are correct
     */
    const { isLoading, isError, data } = result.current;
    expect(isLoading).toEqual(false);
    expect(isError).toEqual(true);
    expect(data).toEqual(null);
  });
});
