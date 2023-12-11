import { Dimension } from "../../../dataclass/position/Dimension";
import { Vector } from "../../../dataclass/position/Vector";
import { Lane } from "../../../dataclass/track/Lane";

describe("Test lane functionality", () => {
  let lane: Lane;

  beforeAll(() => {
    lane = new Lane(new Vector(1, 1), new Dimension(300, 200), "a", [
      [0, 0, 0],
    ]);
  });

  test("Lane has been created succesfully", () => {
    expect(lane).toBeTruthy();
  });

  test("Lane spawns a note successfully", () => {
    lane.spawnNote();
    expect(lane.getNotes().length).toEqual(1);

    expect(lane.getNotes()[0].getX()).toEqual(1);
    expect(lane.getNotes()[0].getY()).toEqual(1);
  });

  test("Lane despawns a note successfully", () => {
    lane.hideBottomNote();
    // Note should not be removed from lane
    expect(lane.getNotes().length).toEqual(1);
    // Note should not be detected as a visible note though
    expect(lane.getVisibleNotes().length).toEqual(0);
  });

  test("Lane has correct identifier", () => {
    expect(lane.getIdentifier()).toBe("a");
  });
});
