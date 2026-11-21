import { CalendarDays, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/common/Tag";
import { PRIORITIES } from "@/lib/tasks";
import { getDeadlineInfo } from "@/lib/projects";

function ProjectItem({ project, stats, onEdit, onDelete }) {
    const priority = PRIORITIES.find((item) => item.value === project.priority);
    const deadline = getDeadlineInfo(project.deadline);
    const isComplete = stats.total > 0 && stats.progress === 100;
    const showOverdue = deadline.overdue && !isComplete;


    const hasRepoLink = /^https?:\/\//i.test(project.repoUrl ?? "");

    return (
        <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
                {project.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                {project.description || "No description."}
            </p>
            </div>

            {priority && <Tag tone={priority.tone}>{priority.label}</Tag>}
        </div>

        <div
            className={`mt-4 flex items-center gap-2 text-xs ${
            showOverdue ? "font-medium text-danger-ink" : "text-muted-foreground"
            }`}
        >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{deadline.label}</span>
        </div>

        <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
                {stats.done}/{stats.total} tasks completed
            </span>
            <span className="font-medium text-foreground">{stats.progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${stats.progress}%` }}
            />
            </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1 border-t border-border pt-3">
            {hasRepoLink && (
            <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open repository"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
                <ExternalLink className="h-4 w-4" />
            </a>
            )}
            <Button variant="ghost" size="icon" onClick={() => onEdit(project)} aria-label="Edit project">
            <Pencil />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(project)} aria-label="Delete project">
            <Trash2 />
            </Button>
        </div>
        </div>
    );
}

export default ProjectItem;