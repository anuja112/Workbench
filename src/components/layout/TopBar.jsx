import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/navigation";

function TopBar({ onMenuClick }) {
    const { pathname } = useLocation();

    const current = navigationItems.find((item) => item.path === pathname);
    const pageTitle = current ? current.label : "Workbench";

    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800 px-4">
        <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
        >
            <Menu size={18} />
        </Button>

        <h1 className="text-sm font-semibold text-zinc-100">{pageTitle}</h1>
        </header>
    );
}

export default TopBar;