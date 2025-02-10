import { ProfileButton } from "./ProfileButton";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1>ZenLight</h1>
        <ProfileButton />
      </div>
    </header>
  );
} 