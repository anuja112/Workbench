import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WorkbenchContext } from "./WorkbenchContext";

export function WorkbenchProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage("workbench:tasks", [], Array.isArray);

    function addTask(data) {
        const task = {
        id: crypto.randomUUID(),
        title: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        status: data.status,
        previousStatus: data.status,
        createdAt: new Date().toISOString(),
        };

        setTasks((prev) => [task, ...prev]);
    }

    function toggleTask(id) {
        setTasks((prev) =>
        prev.map((task) => {
            if (task.id !== id) return task;

            if (task.status === "completed") {
            return { ...task, status: task.previousStatus ?? "pending" };
            }

            return { ...task, previousStatus: task.status, status: "completed" };
        }),
        );
    }

    function deleteTask(id) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    const value = { tasks, addTask, toggleTask, deleteTask };

    return (
        <WorkbenchContext.Provider value={value}>
        {children}
        </WorkbenchContext.Provider>
    );
}