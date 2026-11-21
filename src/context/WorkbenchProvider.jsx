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
        projectId: data.projectId
    };
}

function cleanProject(data) {
    return {
        name: data.name.trim(),
        description: data.description.trim(),
        priority: data.priority,
        deadline: data.deadline,
        repoUrl: data.repoUrl.trim(),
    };
}

export function WorkbenchProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage("workbench:tasks", [], Array.isArray);
    const [projects, setProjects] = useLocalStorage("workbench:projects", [], Array.isArray);

    //Tasks
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

    //Projects
    function addProject(data) {
        const project = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...cleanProject(data),
        };
        setProjects((prev) => [project, ...prev]);
    }

    function updateProject(id, data) {
        setProjects((prev) =>
        prev.map((project) =>
            project.id === id ? { ...project, ...cleanProject(data) } : project,
        ),
        );
    }

    function deleteProject(id) {
        setProjects((prev) => prev.filter((project) => project.id !== id));
        setTasks((prev) => prev.filter((task) => task.projectId !== id));
    }

    const value = {
        tasks,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        projects,
        addProject,
        updateProject,
        deleteProject,
    };

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