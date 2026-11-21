import { getToday } from "@/lib/tasks";

export function getProjectStats(project, tasks) {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const done = projectTasks.filter((task) => task.status === "completed").length;
    const total = projectTasks.length;
    const progress = total === 0 ? 0 : Math.round((done / total) * 100);

    return { total, done, progress };
}

export function getDeadlineInfo(deadline) {
    if (!deadline) return { label: "No deadline", overdue: false };

    const msPerDay = 1000 * 60 * 60 * 24;
    const days = Math.round(
        (new Date(deadline + "T00:00:00") - new Date(getToday() + "T00:00:00")) / msPerDay,
    );

    if (days < 0) {
        return { label: `${-days} ${days === -1 ? "day" : "days"} overdue`, overdue: true };
    }
    if (days === 0) {
        return { label: "Due today", overdue: false };
    }
    return { label: `${days} ${days === 1 ? "day" : "days"} left`, overdue: false };
}