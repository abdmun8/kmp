import React, { FormEvent } from "react";
import { parseColorValue, ColorFilter, ucFirst } from "../utlis/color";
import { Color } from "../data/colors";

const redFilter = (color: Color) => parseColorValue(color.color).r > 127;
const greenFilter = (color: Color) => parseColorValue(color.color).g > 127;
const blueFilter = (color: Color) => parseColorValue(color.color).b > 127;
const saturationFilter = (color: Color) =>
  parseColorValue(color.color).saturation > 50;

type ColorFilterWithLabel = { label: string; filter: ColorFilter };
const colorFilters: ColorFilterWithLabel[] = [
  { label: "red", filter: redFilter },
  { label: "green", filter: greenFilter },
  { label: "blue", filter: blueFilter },
  { label: "saturation", filter: saturationFilter },
];

interface Props {
  setFilter: (filter: ColorFilter[]) => void;
}

const FormFilter: React.FC<Props> = ({ setFilter }) => {
  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const form: FormData = new FormData(e.currentTarget);
    const filters: ColorFilter[] = [];
    for (let i = 0; i < colorFilters.length; i++) {
      const { label, filter }: ColorFilterWithLabel = colorFilters[i];
      if (form.get(label)) filters.push(filter);
    }
    setFilter(filters);
  };

  return (
    <div>
      <form id="form-filter" className="form-filter" onChange={handleChange}>
        <h4>Filter:</h4>
        {colorFilters.map(({ label }) => (
          <label key={label}>
            <input type="checkbox" value={label} name={label} />
            {ucFirst(label)} &gt; 50%
          </label>
        ))}
      </form>
    </div>
  );
};

export default FormFilter;
