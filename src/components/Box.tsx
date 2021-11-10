import React from "react";
import { Color } from "../data/colors";

type Props = Color & {
  removeColor: (color: Color["color"]) => void;
};

const Box: React.FC<Props> = ({ id, color, isInitial, removeColor }) => {
  return (
    <div className="box-wrapper">
      <div className="box" data-color={color}>
        {/* show remove if not initial color */}
        {!isInitial && (
          <div onClick={() => removeColor(id)} className="close">
            &#10006;
          </div>
        )}
      </div>
      <div className="color-code">{color}</div>
    </div>
  );
};

export default Box;
