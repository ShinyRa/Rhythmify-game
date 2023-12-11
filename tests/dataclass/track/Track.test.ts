import { Track } from "../../../dataclass/track/Track";

describe("Test music track functionality", () => {
  let track: Track;
  beforeAll(() => {
    track = new Track();
  });

  test("Track has been created succesfully", () => {
    expect(track).toBeTruthy();
  });

  test("Can add a row of notes to the track", () => {
    track.addRow([0, 0, 0, 1]);
    track.addRow([0, 0, 1, 0]);
    track.addRow([0, 1, 1, 0]);
    track.addRow([1, 1, 1, 1]);

    expect(track.rows).toEqual([
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [1, 1, 1, 1],
    ]);
  });

  test("Track cursor starts and increments correctly", () => {
    expect(track.current).toBe(0);
    expect(track.getCurrentRow()).toEqual([0, 0, 0, 1]);
    track.incrementCurrent();
    expect(track.current).toBe(1);
    expect(track.getCurrentRow()).toEqual([0, 0, 1, 0]);
  });

  test("Track cursor retrieves correct spawn locations", () => {
    track.current = 0;
    expect(track.findIndicesToSpawn()).toEqual([3]);
    track.incrementCurrent();
    expect(track.findIndicesToSpawn()).toEqual([2]);
    track.incrementCurrent();
    expect(track.findIndicesToSpawn()).toEqual([1, 2]);
    track.incrementCurrent();
    expect(track.findIndicesToSpawn()).toEqual([0, 1, 2, 3]);
  });
});
