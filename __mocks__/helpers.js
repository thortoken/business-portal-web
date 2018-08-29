const namedComponent = name => {
  const Component = ({ children }) => children;
  Component.displayName = name;
  return Component;
};

module.exports = {
  namedComponent,
};
