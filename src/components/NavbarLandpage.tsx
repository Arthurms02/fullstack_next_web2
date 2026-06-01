import Logo from "./Logo";

interface NavbarLandpageProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NavbarLandpage({ children, className }: NavbarLandpageProps) {
  return (
    <nav
      className={`${className || ''}`}
    >
      <Logo />
      {children}
    </nav>
  );
}