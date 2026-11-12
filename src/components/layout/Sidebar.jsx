import AppIdentity from "./AppIdentity";
import Navigation from "./Navigation";

function Sidebar({ open, onClose }) {
    return (
        <>
        {open && (
            <div
            className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
            />
        )}

        <aside
            className={`fixed inset-y-0 left-0 z-40 flex w-[280px] shrink-0 flex-col border border-border bg-card p-4 transition-transform duration-200 lg:static lg:translate-x-0 lg:rounded-lg ${
            open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <AppIdentity />

            <div className="mt-8 flex-1">
            <Navigation onNavigate={onClose} />
            </div>
        </aside>
        </>
    );
}

export default Sidebar;