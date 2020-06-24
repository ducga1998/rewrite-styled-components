import * as React from "react";
import { v4 as uuid } from "uuid";
import isFunction from "../utils/isFunction";
import { ThemeContext } from "./index";
const renderCss = (cssRaw, propsElement) => {
  let css = "";
  for (const elementCss of cssRaw) {
    if (isFunction(elementCss)) {
      // if(elementCss.toString().includes('.theme') {
         const result = elementCss(propsElement);
          css += result;    
      // }
    }
    if (typeof elementCss === "string") {
      css += elementCss;
    }
  }
  return css;
};
const useStyledComponentImpl = (WrappedStyledComponent, props, ref, css) => {
  const theme = React.useContext(ThemeContext);
  const newProps = {
    ...props,
    ...{
      theme,
    },
  };
  const newCss = renderCss(css, newProps);
  console.log("newCss", newCss);

  const className = WrappedStyledComponent.componentStyle.insertBefore(newCss);
  WrappedStyledComponent.newClassToString = className;
  newProps.className = [props.className, className].join(" ");
  return React.createElement(WrappedStyledComponent.target, newProps);
};
export const makeStyleTag = (target) => {
  const head = document.head;
  const style = document.createElement("style");
  style.setAttribute("data-style-duc-version", "1.0.0");
  head.insertBefore(style, head.childNodes[head.childNodes.length]);
  return style;
};
class ComponentStyle {
  sheet = {};
  constructor() {
    this.sheet = makeStyleTag();
  }
  getSheet = () => {
    const { styleSheets } = document;
    for (let i = 0, l = styleSheets.length; i < l; i++) {
      const sheet = styleSheets[i];
      if (sheet.ownerNode === this.sheet) {
        return sheet;
      }
    }
  };
  insertBefore(css) {
    const className = uuid();
    const newName = "style-duc-" + className.slice(0, 5);
    console.log("this.getSheet().length", this.getSheet().cssRules.length);
    this.getSheet().insertRule(
      `.${newName}{${css}}`,
      this.getSheet().cssRules.length
    );
    return newName;
  }
}
export default function createStyledComponent(target, css) {
  let WrappedStyledComponent = {};
  const componentStyle = new ComponentStyle(target);
  WrappedStyledComponent.componentStyle = componentStyle;
  WrappedStyledComponent.target = target;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const forwardRef = (props, ref) => useStyledComponentImpl(WrappedStyledComponent, props, ref, css);
  const Element = React.forwardRef(forwardRef);
  Element.toString = () => {
    return `.${WrappedStyledComponent.newClassToString}`;
  };

  console.log("forwardRef", Element);
  return Element;
}
