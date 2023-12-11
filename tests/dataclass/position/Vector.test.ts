import { Vector } from "../../../dataclass/position/Vector";

describe("Test vector functionality", () => {
  let vector: Vector;
  beforeAll(() => {
    vector = new Vector();
  });

  test("Vector has been created succesfully", () => {
    expect(vector).toBeTruthy();
  });

  test("Default vector has correct coordinates on creation", () => {
    expect(vector.getX()).toEqual(0);
    expect(vector.getY()).toEqual(0);
  });

  test("Custom vector has correct coordinates on creation", () => {
    const newVector = new Vector(3, 2);
    expect(newVector.getX()).toEqual(3);
    expect(newVector.getY()).toEqual(2);
  });

  test("Vector outputs as readable string", () => {
    const newVector = new Vector(3, 2);
    expect(newVector.asString()).toEqual("x: 3, y: 2");
  });
});
