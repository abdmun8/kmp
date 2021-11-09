import { Color, ListColors } from "../data/colors";

export default class ColorStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
    const savedColors = window.localStorage.getItem(this.key);

    if (!savedColors) {
      window.localStorage.setItem(key, JSON.stringify([]));
    }
  }

  public add(newColor: Color) {
    const savedColors = window.localStorage.getItem(this.key) as string;
    const parsedColors: ListColors = JSON.parse(savedColors);
    const updatedColors = [...parsedColors, newColor];
    window.localStorage.setItem(this.key, JSON.stringify(updatedColors));
  }

  public remove(id: Color["id"]) {
    const savedColors = window.localStorage.getItem(this.key) as string;
    const parsedColors: ListColors = JSON.parse(savedColors);
    const updatedColors = parsedColors.filter((item) => item.id !== id);
    window.localStorage.setItem(this.key, JSON.stringify(updatedColors));
  }

  public getAll() {
    const savedColors = window.localStorage.getItem(this.key) as string;
    return JSON.parse(savedColors) ?? [];
  }
}
