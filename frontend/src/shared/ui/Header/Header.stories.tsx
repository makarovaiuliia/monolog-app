import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";
import { Button } from "../Button/Button";

const meta = {
  title: "components/Header",
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullScreen: Story = {
  args: {
    isFullScreen: true,
    greetings: "Hello, Julia 💛",
    title: "How do you feel today? Share your feelings in a personal diary",
    subtitle: "Daily reflection",
    children: <Button text="Your reflection" icon={true} />,
  },
};

export const Normal: Story = {
  args: {
    greetings: "Hello, Julia 💛",
    title: "How do you feel today? Share your feelings in a personal diary",
    subtitle: "Daily reflection",
    children: <Button text="Your reflection" icon={true} />,
  },
};

export const WithoutChildren: Story = {
  args: {
    title: "Log into your account",
    subtitle: "New to monolog? Sign up",
  },
};

export const WithReactNodeSubtitle: Story = {
  args: {
    title: "Log into your account",
    subtitle: (
      <>
        New to monolog?{" "}
        <span
          style={{ fontWeight: "600", cursor: "pointer" }}
          onClick={() => alert("Clicked")}
        >
          Sign up
        </span>
      </>
    ),
  },
};
