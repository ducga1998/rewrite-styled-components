import * as  React from "react";

const useStyledComponentImpl  = (tag , props  , ref ) => {
  // propsForElement.ref = refToForward;
  // props.ref  = ref
  const newProps  = {
    ...props  ,
    className : `${prop}`
  }
  return React.createElement(tag , props )
}
export default function createStyledComponent( target ) {

    let WrappedStyledComponent;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const forwardRef = (props, ref) => useStyledComponentImpl(target, props, ref);
    WrappedStyledComponent = (React.forwardRef(forwardRef));
    return WrappedStyledComponent;
  }