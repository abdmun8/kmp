import React from "react";
import "./App.scss";
import initialColors, { ListColors, Color } from "./data/colors";
import Box from "./components/Box";
import FormInput from "./components/FormInput";
import FormFilter from "./components/FormFilter";
import ColorStorage from "./utlis/ColorStorage";

interface AppState {
  colors: ListColors;
}

class App extends React.Component<{}, AppState> {
  public storage: ColorStorage;
  public constructor(props: AppState) {
    super(props);
    this.storage = new ColorStorage("color-storage");
    const savedColors: ListColors = this.storage.getAll();
    const colors = initialColors.map((color: Color["color"]) =>
      this.newColor(color, true)
    );
    this.state = {
      colors: colors.concat(savedColors),
    };
  }

  componentDidMount() {
    console.log("did mount");
    console.log(this.storage.getAll());
  }

  public addColor = (color: Color["color"]) => {
    const newColor = this.newColor(color);
    this.storage.add(newColor);
    this.setState((state) => ({ colors: [...state.colors, newColor] }));
  };

  private newColor = (color: Color["color"], isInitial = false) => {
    const newColor: Color = {
      color: color.toUpperCase(),
      isInitial: isInitial,
      id: Math.random().toString(),
    };
    return newColor;
  };

  public removeColor = (id: Color["id"]) => {
    this.storage.remove(id);
    this.setState((state) => ({
      colors: state.colors.filter((item) => item.id !== id),
    }));
  };

  render() {
    const { colors } = this.state;
    return (
      <div className="App">
        <FormInput addColor={this.addColor} />
        <FormFilter />
        <div className="boxes-container">
          {colors.map((data) => {
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
