import type { Meta, StoryObj } from "@storybook/react";
import { EntryList } from "./EntryList";
import { Moods } from "@/shared/types/mood";

const meta = {
  title: "components/EntryList",
  component: EntryList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(188, 206, 236, 0.1)",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const normal: Story = {
  args: {
    list: {
      "18 December 2024": [
        {
          id: "678912a4ad6ab9fb55d8056d",
          userId: "678911b294b1e41b8fbaa037",
          content: "LoresIpsum",
          title: "LoresIpsum",
          mood: Moods.HAPPY,
          date: "2025-01-16T14:07:32.810+00:00",
        },
        {
          id: "678912a4ad6ab9fb55d8056d",
          userId: "678911b294b1e41b8fbaa037",
          content: "LoresIpsum",
          title: "LoresIpsum",
          mood: Moods.UPSET,
          date: "2025-01-16T14:07:32.810+00:00",
        },
      ],
      "19 December 2024": [
        {
          id: "678912a4ad6ab9fb55d8056d",
          userId: "678911b294b1e41b8fbaa037",
          content: "LoresIpsum",
          title: "LoresIpsum",
          mood: Moods.FURIOUS,
          date: "2025-01-17T14:07:32.810+00:00",
        },
      ],
    },
  },
};
