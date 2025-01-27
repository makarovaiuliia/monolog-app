import type { Meta, StoryObj } from "@storybook/react";
import { Moods } from "@/shared/types/mood";

import { Entry } from "./Entry";

const meta = {
  title: "components/Entry",
  component: Entry,
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
} satisfies Meta<typeof Entry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Happy: Story = {
  args: {
    title: "My new personal diary entry",
    body: "I'm so happy constantly, it's just hilarious how i can be so sad one day and so happy on the other",
    mood: Moods.HAPPY,
  },
};

export const Upset: Story = {
  args: {
    title: "My new personal diary entry",
    body: "I'm so sad constantly, it's just hilarious how i can be so happy one day and so sad on the other",
    mood: Moods.UPSET,
  },
};
