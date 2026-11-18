import { Check, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/common/Tag";
import { PRIORITIES, STATUSES, formatDate, isOverdue } from "@/lib/tasks";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const isDone = task.status === "completed";
    const overdue = isOverdue(task);
    const priority = PRIORITIES.find((item) => item.value === task.priority);
    const status = STATUSES.find((item) => item.value === task.status);

    return (
        <li
        className={`flex items-start gap-3 rounded-lg border bg-card p-3 ${
            overdue ? "border-danger/40" : "border-border"
        }`}
        >
        <button
            type="button"
            onClick={() => onToggle(task.id)}
            aria-label={isDone ? "Mark as not completed" : "Mark as completed"}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
            isDone
                ? "border-success bg-success text-white"
                : "border-muted-foreground hover:border-foreground"
            }`}
        >
            {isDone && <Check className="h-3 w-3" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
            <p
            className={`text-sm font-medium ${
                isDone ? "text-muted-foreground line-through" : "text-foreground"
            }`}
            >
            {task.title}
            </p>

            {task.description && (
            <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                {task.description}
            </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
            {status && <Tag tone={status.tone}>{status.label}</Tag>}
            {priority && <Tag tone={priority.tone}>{priority.label}</Tag>}
            {task.dueDate && (
                <Tag tone={overdue ? "danger" : "neutral"}>
                {overdue ? "Overdue" : "Due"} · {formatDate(task.dueDate)}
                </Tag>
            )}
            </div>
        </div>

        <div className="flex shrink-0 gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(task)} aria-label="Edit task">
            <Pencil />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task)} aria-label="Delete task">
            <Trash2 />
            </Button>
        </div>
        </li>
    );
}

export default TaskItem;