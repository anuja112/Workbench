import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const WorkbenchContext = createContext(null);

function cleanTask(data) {
    return {
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        status: data.status,
        dueDate: data.dueDate,
    };
}

export function WorkbenchProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage("workbench:tasks", [], Array.isArray);

    function addTask(data) {
        const task = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...cleanTask(data),
        };
        setTasks((prev) => [task, ...prev]);
    }

    function updateTask(id, data) {
        setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...cleanTask(data) } : task)),
        );
    }

    function toggleTask(id) {
        setTasks((prev) =>
        prev.map((task) =>
            task.id === id
            ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
            : task,
        ),
        );
    }

    function deleteTask(id) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    const value = { tasks, addTask, updateTask, toggleTask, deleteTask };

    return (
        <WorkbenchContext.Provider value={value}>
        {children}
        </WorkbenchContext.Provider>
    );
    }

    export function useWorkbench() {
    const context = useContext(WorkbenchContext);
    if (!context) {
        throw new Error("useWorkbench must be used inside <WorkbenchProvider>");
    }
    return context;
}