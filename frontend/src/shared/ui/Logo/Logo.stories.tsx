import type { Meta, StoryObj } from "@storybook/react";

import { Logo } from "./Logo";

const meta = {
  title: "components/Logo",
  component: Logo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(188, 206, 236, 0.1)",
          padding: "20px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const normal: Story = {};
