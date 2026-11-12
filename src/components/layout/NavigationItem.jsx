import { NavLink } from "react-router-dom";

function NavigationItem({ label, path, icon: Icon, onNavigate }) {
    return (
        <NavLink
        to={path}
        onClick={onNavigate}
        className={({ isActive }) =>
            [
            "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-150",
            isActive
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            ].join(" ")
        }
        >
        {({ isActive }) => (
            <>
            {isActive && (
                <span className="absolute inset-y-2 left-0 w-[3px] bg-brand" />
            )}
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
            </>
        )}
        </NavLink>
    );
}

export default NavigationItem;