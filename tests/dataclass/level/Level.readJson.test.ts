import * as levelData from "./trackData.json";

describe("Read level data functionality", () => {
  test("data has been successfully parsed", () => {
    expect(levelData).toBeTruthy();
  });
});
