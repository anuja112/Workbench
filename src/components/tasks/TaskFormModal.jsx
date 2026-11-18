import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import OptionSelect from "@/components/common/OptionSelect";
import { PRIORITIES, STATUSES } from "@/lib/tasks";

// task = null  -> create a new task
// task = {...} -> edit that task
function TaskFormModal({ task = null, onSubmit, onClose }) {
    const isEditing = task !== null;

    const [form, setForm] = useState({
        title: task?.title ?? "",
        description: task?.description ?? "",
        priority: task?.priority ?? "medium",
        status: task?.status ?? "pending",
        dueDate: task?.dueDate ?? "",
    });

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!form.title.trim()) return;

        onSubmit(form);
        onClose();
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
                <DialogTitle>{isEditing ? "Edit task" : "Create task"}</DialogTitle>
                <DialogDescription>
                {isEditing
                    ? "Update the details of this task."
                    : "Add a new task to your workspace."}
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
                <Label htmlFor="task-title">Title</Label>
                <Input
                id="task-title"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="What needs to be done?"
                autoFocus
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                id="task-description"
                rows={3}
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Optional details"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Priority</Label>
                <OptionSelect
                    value={form.priority}
                    onChange={(value) => updateField("priority", value)}
                    options={PRIORITIES}
                    className="w-full"
                />
                </div>

                <div className="space-y-2">
                <Label>Status</Label>
                <OptionSelect
                    value={form.status}
                    onChange={(value) => updateField("status", value)}
                    options={STATUSES}
                    className="w-full"
                />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="task-due-date">Due date</Label>
                <Input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={(event) => updateField("dueDate", event.target.value)}
                />
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                Cancel
                </Button>
                <Button type="submit" disabled={!form.title.trim()}>
                {isEditing ? "Save changes" : "Create task"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}

export default TaskFormModal;