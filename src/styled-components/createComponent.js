export default function createStyledComponent(
    target  , 
    options , 
    rules 
  ) {
  
    console.log("rules",rules)
    const isTargetStyledComp = isStyledComponent(target);
    const isCompositeComponent = !isTag(target);
  
    const {
      displayName = generateDisplayName(target),
      componentId = generateId(options.displayName, options.parentComponentId),
      attrs = EMPTY_ARRAY,
    } = options;
  
    const styledComponentId =
      options.displayName && options.componentId
        ? `${escape(options.displayName)}-${options.componentId}`
        : options.componentId || componentId;
  
    // fold the underlying StyledComponent attrs up (implicit extend)
    const finalAttrs =
      // $FlowFixMe
      isTargetStyledComp && target.attrs
        ? Array.prototype.concat(target.attrs, attrs).filter(Boolean)
        : attrs;
  
    // eslint-disable-next-line prefer-destructuring
    let shouldForwardProp = options.shouldForwardProp;
  
    // $FlowFixMe
    if (isTargetStyledComp && target.shouldForwardProp) {
      if (shouldForwardProp) {
        // compose nested shouldForwardProp calls
        shouldForwardProp = (prop, filterFn) =>
          // $FlowFixMe
          target.shouldForwardProp(prop, filterFn) && options.shouldForwardProp(prop, filterFn);
      } else {
        // eslint-disable-next-line prefer-destructuring
        shouldForwardProp = target.shouldForwardProp;
      }
    }
  
    const componentStyle = new ComponentStyle(
      isTargetStyledComp
        ? // fold the underlying StyledComponent rules up (implicit extend)
          // $FlowFixMe
          target.componentStyle.rules.concat(rules)
        : rules,
      styledComponentId
    );
    // console.log("componentStyle",componentStyle)
  
    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */
    let WrappedStyledComponent;
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const forwardRef = (props, ref) => useStyledComponentImpl(WrappedStyledComponent, props, ref);
  
    forwardRef.displayName = displayName;
  
    // $FlowFixMe this is a forced cast to merge it StyledComponentWrapperProperties
    WrappedStyledComponent = (React.forwardRef(forwardRef));
  
    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.displayName = displayName;
    WrappedStyledComponent.shouldForwardProp = shouldForwardProp;
  
    // this static is used to preserve the cascade of static classes for component selector
    // purposes; this is especially important with usage of the css prop/
    WrappedStyledComponent.foldedComponentIds = isTargetStyledComp
      ? // $FlowFixMe
        Array.prototype.concat(target.foldedComponentIds, target.styledComponentId)
      : EMPTY_ARRAY;
  
    WrappedStyledComponent.styledComponentId = styledComponentId;
  
    // fold the underlying StyledComponent target up since we folded the styles
    WrappedStyledComponent.target = isTargetStyledComp
      ? // $FlowFixMe
        target.target
      : target;
  
    // $FlowFixMe
    WrappedStyledComponent.withComponent = function withComponent(tag) {
      const { componentId: previousComponentId, ...optionsToCopy } = options;
  
      const newComponentId =
        previousComponentId &&
        `${previousComponentId}-${isTag(tag) ? tag : escape(getComponentName(tag))}`;
  
      const newOptions = {
        ...optionsToCopy,
        attrs: finalAttrs,
        componentId: newComponentId,
      };
  
      return createStyledComponent(tag, newOptions, rules);
    };
  
    // $FlowFixMe
    Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
      get() {
        return this._foldedDefaultProps;
      },
  
      set(obj) {
        // $FlowFixMe
        this._foldedDefaultProps = isTargetStyledComp ? merge({}, target.defaultProps, obj) : obj;
      },
    });
  
    if (process.env.NODE_ENV !== 'production') {
      checkDynamicCreation(displayName, styledComponentId);
  
      WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(
        displayName,
        styledComponentId
      );
    }
  
    // $FlowFixMe
    WrappedStyledComponent.toString = () => `.${WrappedStyledComponent.styledComponentId}`;
  
    if (isCompositeComponent) {
      hoist(WrappedStyledComponent, (target), {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        foldedComponentIds: true,
        shouldForwardProp: true,
        self: true,
        styledComponentId: true,
        target: true,
        withComponent: true,
      });
    }
    console.log("WrappedStyledComponent",WrappedStyledComponent)
    // console.log("WrappedStyledComponent",WrappedStyledComponent)
    return WrappedStyledComponent;
  }