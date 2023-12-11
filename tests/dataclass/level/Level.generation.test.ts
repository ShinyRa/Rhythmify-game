import { LevelGenerator } from "../../../util/LevelGenerator";
import { Track } from "../../../dataclass/track/Track";

import levelData from "./trackData.json";

describe("Read level data functionality", () => {
  let track: Track;
  beforeEach(() => {
    track = LevelGenerator.create(levelData);
  });

  test("track has been successfully created", () => {
    expect(track).toBeTruthy();
  });

  test("multiple lanes of notes have been generated", () => {
    expect(track.rows.length).toBeGreaterThan(0);
  });
});
