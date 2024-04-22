import { Button, ButtonProps } from "antd";

export function PrimaryButton(props: ButtonProps) {
  const { children } = props;
  return (
    <Button type="primary" {...props}>
      {children}
    </Button>
  );
}

export function OutlineButton(props: ButtonProps) {
  const { children } = props;
  return (
    <Button type="default" {...props}>
      {children}
    </Button>
  );
}

interface IconButtonProps extends Omit<ButtonProps, "icon"> {
  icon: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
  const { icon, children } = props;
  return (
    <Button type="text" {...props} size="large" icon={icon}>
      {children}
    </Button>
  );
}