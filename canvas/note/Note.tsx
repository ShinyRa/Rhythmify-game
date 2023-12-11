import {useCallback} from "react";
import {Graphics} from "@pixi/react";
import {Note as NoteData} from "../../dataclass/note/Note";

type INoteData = {
    data: NoteData;
};

const Note = ({data}: INoteData) => {
  const draw = useCallback(
    (graphics: any) => {
      // If the node is not visible, no further drawing operations are performed
      if (data.isOfScreen()) {
        graphics.clear();
        return;
      }

      const {backgroundColor, lineColor} = data.requestColors();

      // If the node is visible, draw the note's rectangle
      graphics.clear();
      graphics.lineStyle(2, lineColor);
      graphics.beginFill(backgroundColor);

      graphics.drawRect(
        data.getX(),
        data.getY(),
        data.dimension.getWidth(),
        data.dimension.getHeight()
      );
    },
    [data.getX(), data.getY()]
  );

  return <Graphics draw={draw}/>;
};

export default Note;
