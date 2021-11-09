import React, { FormEvent } from "react";
import { Color } from "../data/colors";

interface Props {
  addColor: (value: Color["color"]) => void;
}

const FormInput: React.FC<Props> = ({ addColor }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const color = form.get("color") as string;
    addColor(color);
  };

  return (
    <form className="form-input" name="add-color" onSubmit={handleSubmit}>
      <input type="text" name="color" placeholder="Input color" />
      <button type="submit">Add</button>
    </form>
  );
};

export default FormInput;
