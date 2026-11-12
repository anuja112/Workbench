import { navigationItems } from "@/lib/navigation";
import NavigationItem from "./NavigationItem";

function Navigation({ onNavigate }) {
    return (
        <nav className="flex flex-col gap-1">
        {navigationItems.map((item) => (
            <NavigationItem
            key={item.path}
            label={item.label}
            path={item.path}
            icon={item.icon}
            onNavigate={onNavigate}
            />
        ))}
        </nav>
    );
}

export default Navigation;