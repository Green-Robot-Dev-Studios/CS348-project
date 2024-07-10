import { PanelLeft, DropletIcon, Home, Search, LogOut, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import { useFeathers } from "figbird";
import DisplayUser from "./display-user";
import useCurrentUser from "@/hooks/useCurrentUser";

const higlightedMenuClasses = "flex items-center gap-4 px-2.5 text-foreground";
const normalMenuClasses = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

const Navbar = () => {
  const feathers = useFeathers();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleLogout = async () => {
    await feathers.logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="x-4 bg-backgroundk sticky top-0 z-30 flex h-auto items-center gap-4 border-0 border-b pl-6">
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
            <Link to="/" className={window.location.pathname === "/" ? higlightedMenuClasses : normalMenuClasses}>
              <PlusIcon className="h-5 w-5" />
              Create Room
            </Link>
            <Link
              to="/browse"
              className={window.location.pathname === "/browse" ? higlightedMenuClasses : normalMenuClasses}
            >
              <Search className="h-5 w-5" />
              Browse food
            </Link>
            <Link
              onClick={handleLogout}
              className={window.location.pathname === "/browse" ? higlightedMenuClasses : normalMenuClasses}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
