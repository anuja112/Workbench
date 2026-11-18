export const PRIORITIES = [
    { value: "low", label: "Low", tone: "neutral" },
    { value: "medium", label: "Medium", tone: "neutral" },
    { value: "high", label: "High", tone: "brand" },
];

export const STATUSES = [
    { value: "pending", label: "Pending", tone: "neutral" },
    { value: "in-progress", label: "In progress", tone: "info" },
    { value: "completed", label: "Completed", tone: "success" },
];

export function getToday() {
    return new Date().toLocaleDateString("en-CA");
}

// "2026-11-19" -> "Nov 19"
export function formatDate(dateString) {
    return new Date(dateString + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
}

export function isOverdue(task) {
    return (
        Boolean(task.dueDate) &&
        task.status !== "completed" &&
        task.dueDate < getToday()
    );
}