import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppShell({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen gap-3 bg-zinc-950 p-3 text-zinc-100">
        <Sidebar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
            <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

            <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </div>
        </div>
    );
}

export default AppShell;