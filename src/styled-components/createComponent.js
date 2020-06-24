import * as React from "react";
import { v4 as uuid } from "uuid";
import { ThemeContext } from "./index";
const renderCss = (cssRaw, propsElement) => {
  let css = "";
  for (const elementCss of cssRaw) {
    if (typeof elementCss === 'function') {
         const result = elementCss(propsElement);
          css += result;    
    }
    if (typeof elementCss === "string") { css += elementCss; }
  }
  return css;
};
const useStyledComponentImpl = (WrappedStyledComponent, props, ref, css) => {
  const theme = React.useContext(ThemeContext);
  const newProps = { ...props, ...{ theme, ref } };
  const newCss = renderCss(css, newProps);
  const className = WrappedStyledComponent.componentStyle.insertBefore(newCss);
  WrappedStyledComponent.newClassToString = className;
  newProps.className = [props.className, className].join(" ");
  return React.createElement(WrappedStyledComponent.target, newProps);
};
export const makeStyleTag = () => {
  const style = document.createElement("style");
  style.setAttribute("data-style-duc-version", "1.0.0");
  document.head.insertBefore(style, document.head.childNodes[document.head.childNodes.length]);
  return style;
};
class ComponentStyle {
  sheet = {};
  constructor() {
    const styleDom =  makeStyleTag();
    this.sheet =  styleDom.sheet;
  }
  insertBefore(css) {
    const className = uuid();
    const newName = "style-duc-" + className.slice(0, 5);
    this.sheet.insertRule(
      `.${newName}{${css}}`,
      this.sheet.cssRules.length
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
  return Element;
}
