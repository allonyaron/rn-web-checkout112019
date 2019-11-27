import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("App", () => App);

console.log(`index.js`)

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
