import { Button } from "../Button/Button";
import { Header } from "../Header/Header";

interface Props {
  onRetry: () => void;
  userName: string;
}
export const Error = ({ onRetry, userName }: Props) => {
  return (
    <Header
      title="We’re very sorry, but something went wrong. Please, try again later or push the button"
      subtitle="Problem with an app"
      greetings={`Hello, ${userName} 💛`}
    >
      <Button onClick={onRetry} text="retry" />
    </Header>
  );
};
