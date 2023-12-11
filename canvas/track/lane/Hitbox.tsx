import { Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useCallback } from "react";
import { Hitbox as HitboxData } from "../../../dataclass/track/HitBox";
import { isLight, pixiColorFromRgb } from "../../../../helpers/colorHelpers";
import { RGBColor } from "colorthief";

type IHitboxData = {
  hitboxData: HitboxData;
  keyPressed: boolean | undefined;
  identifier: string;
  colors: RGBColor[];
};

const Hitbox = ({
  hitboxData,
  identifier,
  keyPressed,
  colors,
}: IHitboxData) => {
  const draw = useCallback(
    (graphics: any) => {
      graphics.clear();
      graphics.beginFill(pixiColorFromRgb(colors[0]), 1);
      graphics.lineStyle(hitboxData.borderWidth, hitboxData.requestColors(), 1);
      graphics.drawRect(
        hitboxData.getX(),
        window.innerHeight * 0.6,
        hitboxData.dimension.getWidth(),
        100
      );
    },
    [keyPressed, hitboxData.requestColors(), hitboxData.borderWidth]
  );

  return (
    <>
      <Graphics draw={draw} />
      <Text
        text={identifier}
        x={hitboxData.position.getX() + hitboxData.dimension.width / 3}
        y={window.innerHeight * 0.6 + 30}
        style={
          new PIXI.TextStyle({
            align: "center",
            fill: hitboxData.requestColors().toRgbaString(),
          })
        }
      />
    </>
  );
};

export default Hitbox;
