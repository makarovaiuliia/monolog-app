import type { Meta, StoryObj } from "@storybook/react";

import { AuthForm } from "./AuthForm";

const meta = {
  title: "components/AuthForm",
  component: AuthForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(188, 206, 236, 0.1)",
          padding: "20px",
          height: "400px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {
  args: {},
};

export const SignupForm: Story = {
  args: {
    isSignUp: true,
  },
};
