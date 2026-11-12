import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    BarChart3,
    Settings,
    } from "lucide-react";

    export const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", path: "/projects", icon: FolderKanban },
    { label: "Tasks", path: "/tasks", icon: ListTodo },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Settings", path: "/settings", icon: Settings },
];