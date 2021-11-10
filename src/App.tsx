import React from "react";
import "./App.scss";
import initialColors, { ListColors, Color } from "./data/colors";
import Box from "./components/Box";
import FormInput from "./components/FormInput";
import FormFilter from "./components/FormFilter";
import ColorStorage from "./utlis/ColorStorage";
import { sortColors, reduceFilters, ColorFilter } from "./utlis/color";

interface AppState {
  colors: ListColors;
  filters: ColorFilter[];
}

class App extends React.Component<{}, AppState> {
  public storage: ColorStorage;
  public constructor(props: AppState) {
    super(props);
    this.storage = new ColorStorage("color-storage");
    const savedColors: ListColors = this.storage.getAll();
    const colors: ListColors = initialColors.map((color: Color["color"]) =>
      this.newColor(color, true)
    );
    this.state = {
      colors: colors.concat(savedColors),
      filters: [],
    };
  }

  componentDidMount() {
    this.setColor();
  }

  componentDidUpdate() {
    this.setColor();
  }

  private setColor = () => {
    const boxes: NodeListOf<HTMLElement> =
      window.document.querySelectorAll(".box");
    boxes.forEach((item) => {
      item.style.backgroundColor = item.dataset.color as string;
    });
  };

  private newColor = (color: Color["color"], isInitial = false) => {
    const newColor: Color = {
      color: color.toUpperCase(),
      isInitial: isInitial,
      id: Math.random().toString(),
    };
    return newColor;
  };

  public addColor = (color: Color["color"]) => {
    const newColor: Color = this.newColor(color);
    this.storage.add(newColor);
    this.setState((state) => ({ colors: [...state.colors, newColor] }));
  };

  public removeColor = (id: Color["id"]) => {
    this.storage.remove(id);
    this.setState((state) => ({
      colors: state.colors.filter((item) => item.id !== id),
    }));
  };

  public setFilter = (filters: ColorFilter[]) => {
    this.setState({ filters });
  };

  render() {
    const { colors, filters }: AppState = this.state;
    const filteredColors: ListColors = reduceFilters(filters, colors);
    const sortedColors: ListColors = sortColors(filteredColors);
    return (
      <div className="App">
        <FormInput addColor={this.addColor} />
        <FormFilter setFilter={this.setFilter} />
        <div className="boxes-container">
          {sortedColors.map((data: Color) => {
            return (
              <Box key={data.id} {...data} removeColor={this.removeColor} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
