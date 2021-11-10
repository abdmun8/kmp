import React, { FormEvent, useState } from "react";
import { Color } from "../data/colors";
import { validateColor } from "../utlis/color";

interface Props {
  addColor: (value: Color["color"]) => void;
}

const FormInput: React.FC<Props> = ({ addColor }) => {
  const [isValidColor, setIsValidColor] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: FormData = new FormData(e.currentTarget);
    const color: string = form.get("color") as string;
    addColor(color);
    e.currentTarget.reset();
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const color: string = e.currentTarget.value;
    const isValid: boolean = validateColor(color);
    setIsValidColor(isValid);
  };

  return (
    <div className="form-input-wrapper">
      <form className="form-input" name="add-color" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="color-input"
          type="text"
          name="color"
          placeholder="Input color"
        />
        <button disabled={!isValidColor} className="add-button" type="submit">
          Add
        </button>
      </form>
      <span>Please input valid hex color, for example #FFF or #FFFFFF</span>
    </div>
  );
};

export default FormInput;
