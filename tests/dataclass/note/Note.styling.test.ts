import { Color } from "pixi.js";
import { Note } from "../../../dataclass/note/Note";

describe("Note handles styling", () => {
  var note: Note;

  beforeEach(() => {
    note = new Note();
  });

  test("Note has correct style", () => {
    expect(note.getBackgroundColor()).toEqual(new Color("white"));
    expect(note.getOutlineColor()).toEqual(new Color("black"));
  });

  test("Note accepts new styling properties", () => {
    note.setStyle({
      lineColor: new Color("white"),
      backgroundColor: new Color("black"),
    });

    expect(note.getBackgroundColor()).not.toEqual(new Color("white"));
    expect(note.getOutlineColor()).not.toEqual(new Color("black"));

    expect(note.getBackgroundColor()).toEqual(new Color("black"));
    expect(note.getOutlineColor()).toEqual(new Color("white"));
  });
});
