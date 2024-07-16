import useCurrentUser from "@/hooks/useCurrentUser";
import { Link, useNavigate } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import { LogOut, PanelLeft, PlusIcon, Search, UserCog } from "lucide-react";
import DisplayUser from "./display-user";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const highlightedMenuClasses = "flex items-center gap-4 px-2.5 text-foreground";
const normalMenuClasses = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

const Navbar = () => {
  const feathers = useFeathers();
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const handleLogout = async () => {
    await feathers.logout();
    navigate({ to: "/signup", search: { redirect: "" } });
  };

  return (
    <header className="sticky flex items-center gap-4 border-0 border-b bg-background pl-6 w-full">
      <Link to="/" className="text-center font-display text-xl font-semibold">
        Waterfood
      </Link>
      <span className="flex-grow"></span>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            {user && <DisplayUser user={user} />}
            <Link to="/" className={window.location.pathname === "/" ? highlightedMenuClasses : normalMenuClasses}>
              <PlusIcon className="h-5 w-5" />
              Create Room
            </Link>
            <Link
              to="/browse"
              className={window.location.pathname === "/browse" ? highlightedMenuClasses : normalMenuClasses}
            >
              <Search className="h-5 w-5" />
              Browse Food
            </Link>
            {user && <Link to="/account" className={window.location.pathname === "/account" ? highlightedMenuClasses : normalMenuClasses}>
              <UserCog className="h-5 w-5" />
              Account Settings
            </Link>}
            {user && <Link
              onClick={handleLogout}
              className={window.location.pathname === "/browse" ? highlightedMenuClasses : normalMenuClasses}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
