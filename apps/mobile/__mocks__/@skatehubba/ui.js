// Mock for @skatehubba/ui
module.exports = {
  SKATE: {
    colors: {
      ink: "#0a0a0a",
      paper: "#f5f3ef",
      neon: "#39ff14",
      grime: "#1c1c1c",
      blood: "#b80f0a",
      gold: "#e3c300",
    },
    radius: { lg: 16, xl: 24 },
    timing: { fast: 120, norm: 220, slow: 360 },
  },
  GrittyButton: function GrittyButton({ children, onPress }) {
    const React = require('react');
    const { Text, Pressable } = require('react-native');
    return React.createElement(Pressable, { onPress, testID: 'gritty-button' }, 
      React.createElement(Text, null, children)
    );
  },
};
