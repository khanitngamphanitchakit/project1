import { LogoMark } from "./icons";

export default function Header() {
  return (
    <header className="top-header">
      <LogoMark className="logo-mark" />
      <span className="logo-word">Order by Khanit</span>
    </header>
  );
}
