import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppShell({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen gap-3 bg-background p-3 text-foreground">
        <Sidebar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-background">
            <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

            <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </div>
        </div>
    );
}

export default AppShell;