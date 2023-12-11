import { Container, Graphics, Text } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { Lane as LaneData } from "../../../dataclass/track/Lane";
import {
  InvisibleState,
  MissedState,
  Note as NoteData,
} from "../../../dataclass/note/Note";
import Note from "../../note/Note";
import Hitbox from "./Hitbox";
import { useScore } from "../../../hooks/useScore";
import {
  invertPixiColorFromRgb,
  isLight,
  pixiColorFromRgb,
} from "../../../../helpers/colorHelpers";
import { TextStyle } from "pixi.js";
import { RGBColor } from "colorthief";
import Chit from "./C_hit.mp3";
import CMiss from "./C_miss.mp3";
import {
  HitState as HitHitboxState,
  MissedState as MissedHitboxState,
} from "../../../dataclass/track/HitBox";

type ILaneData = {
  data: LaneData;
  colors: RGBColor[];
};

type KeyboardEvent = {
  key: string;
};

const Lane = ({ data, colors }: ILaneData) => {
  const [notes, setNotes] = useState<NoteData[]>(data.notes);
  const [keyPressed, setKeyPresed] = useState<boolean>();
  const { score, updateScore } = useScore();
  let audioHit: HTMLAudioElement;
  let audioMiss: HTMLAudioElement;

  const textStyle = new TextStyle({
    fill: isLight(colors[0]) ? "#000" : "#fff",
  });

  const draw = useCallback(
    (graphics: any) => {
      graphics.clear();
      graphics.lineStyle(2, invertPixiColorFromRgb(colors[0]), 0.4);
      graphics.beginFill(pixiColorFromRgb(colors[0]), 1);
      graphics.drawRect(data.position.getX(), 0, data.dimension.width, 1000);
    },
    // eslint-disable-next-line 
    [keyPressed]
  );

  /**
   * If bottom note of the lane intersect with the lane's hitbox
   * calculate the precision and increase the score and combo based on the scoreSong calculation.
   */
  const incrementScore = () => {
    const precisionScore = data
      .getBottomNote()
      ?.getYOfNoteInsideHitbox(data.hitbox);
    score.incrementCombo();
    score.scoreSong(precisionScore, data.getBottomNote()?.getWorth());
    updateScore(score);
  };

  /**
   * Reset the score
   */
  const resetScore = () => {
    score.resetCombo();
    updateScore(score);
  };

  /**
   * Toggle state when key is lifted
   * @param key
   */
  const keyUpFunction = ({ key }: KeyboardEvent) => {
    if (key === data.getIdentifier()) {
      setKeyPresed(false);
    }
  };

  /**
   * Toggle state when key is pressed, check if note intersects with lane's hitbox.
   * @param key
   */
  const keyDownFunction = ({ key }: KeyboardEvent) => {
    if (key === data.getIdentifier()) {
      if (data.getBottomNote()?.intersects(data.hitbox)) {
        data.hitbox.transitionTo(new HitHitboxState(data.hitbox));
        audioHit.play();
        incrementScore();
        data
          .getBottomNote()
          ?.transitionTo(new InvisibleState(data.getBottomNote()));
      } else {
        data.hitbox.transitionTo(new MissedHitboxState(data.hitbox));
        audioMiss.play();
        resetScore();
        data
          .getBottomNote()
          ?.transitionTo(new MissedState(data.getBottomNote()));
      }

      data.hitbox.requestAnimation();
      setKeyPresed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", keyUpFunction);
    window.addEventListener("keydown", keyDownFunction);

    audioHit = new Audio(Chit);
    audioMiss = new Audio(CMiss);

    const updateLoop = setInterval(() => {
      notes.forEach((note) => {
        const visible = note.isVisible();
        note.fall();
        note.requestAnimate();
        if (!note.isVisible() && visible) {
          resetScore();
        }
      });
      setNotes([...notes]);
    }, 7);

    return () => clearInterval(updateLoop);
    // eslint-disable-next-line
  }, []);

  return (
    // Todo set to global defined variable for canvas height
    <Container height={window.innerHeight - 95}>
      <Graphics draw={draw} />
      <Text
        text={score?.readableCombo()}
        x={data.dimension.getWidth() / 2}
        style={textStyle}
      />
      <Text
        text={score?.readableScore()}
        x={data.dimension.getWidth() + 50}
        style={textStyle}
      />
      <Hitbox
        hitboxData={data.hitbox}
        identifier={data.getIdentifier()}
        keyPressed={keyPressed}
        colors={colors}
      />
      {notes?.map((note, i) => {
        return <Note data={note} key={i} />;
      })}
    </Container>
  );
};

export default Lane;
