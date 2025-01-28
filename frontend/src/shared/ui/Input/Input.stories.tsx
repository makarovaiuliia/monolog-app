import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "components/Input",
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const normal: Story = {
  args: {
    placeholder: "example@gmail.com",
  },
};
