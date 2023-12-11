import { Note } from "../../../dataclass/note/Note";
import { Vector } from "../../../dataclass/position/Vector";

describe("Note position functionality", () => {
  let note: Note;

  beforeEach(() => {
    note = new Note();
  });

  test("Note handles position", () => {
    expect(note.getX()).toEqual(0);
    expect(note.getY()).toEqual(0);

    note.setPosition(new Vector(3, 2));

    expect(note.getX()).not.toEqual(0);
    expect(note.getY()).not.toEqual(0);

    expect(note.getX()).toEqual(3);
    expect(note.getY()).toEqual(2);
  });

  test("Note's position changes when falling", () => {
    note.setPosition(new Vector(3, 2));

    note.fall();

    expect(note.getY()).toEqual(4);
    expect(note.isVisible()).toBe(true);
  });

  test("Note can fall off-screen", () => {
    note.setPosition(new Vector(3, 999));

    note.fall();

    expect(note.getY()).toEqual(1001);
    expect(note.isVisible()).toBe(false);
  });
});
