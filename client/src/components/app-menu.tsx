import { DropletIcon, Home, PanelLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";

interface IAppMenuProps {}

const AppMenu: React.FC<IAppMenuProps> = () => {
  const highlightedClasses = "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const normalClasses = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  const higlightedMenuClasses = "flex items-center gap-4 px-2.5 text-foreground";
  const normalMenuClasses = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <DropletIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Waterfood</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/"
                className={window.location.pathname === "/" ? highlightedClasses : normalClasses}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/browse"
                className={window.location.pathname === "/browse" ? highlightedClasses : normalClasses}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Browse</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Browse</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <DropletIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Waterfood</span>
                </Link>
                <Link to="/" className={window.location.pathname === "/" ? higlightedMenuClasses : normalMenuClasses }>
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/browse"
                  className={window.location.pathname === "/browse" ? higlightedMenuClasses : normalMenuClasses}
                >
                  <Search className="h-5 w-5" />
                  Browse
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  );
};

export default AppMenu;
