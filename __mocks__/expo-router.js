const React = require('react');

const Tabs = ({ children }) =>
  React.createElement(React.Fragment, null, children);

Tabs.Screen = jest.fn(() => null);

const Stack = ({ children }) =>
  React.createElement(React.Fragment, null, children);

Stack.Screen = jest.fn(() => null);

module.exports = { Stack, Tabs };
