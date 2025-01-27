import type { Preview } from "@storybook/react";
import "../src/shared/styles/global.css";
import "./variables.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
