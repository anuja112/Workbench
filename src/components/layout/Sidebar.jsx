import AppIdentity from "./AppIdentity";
import Navigation from "./Navigation";

function Sidebar({ open, onClose }) {
    return (
        <>
        {/* mobile overlay */}
        {open && (
            <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
            />
        )}

        <aside
            className={`fixed inset-y-0 left-0 z-40 flex w-[280px] shrink-0 flex-col border border-zinc-800 bg-zinc-900 p-4 transition-transform duration-200 lg:static lg:translate-x-0 lg:rounded-lg lg:bg-zinc-900/70 ${
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