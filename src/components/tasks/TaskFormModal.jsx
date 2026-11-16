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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PRIORITIES, STATUSES } from "@/lib/tasks";

const emptyForm = {
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
};

const openStatuses = STATUSES.filter((item) => item.value !== "completed");

function TaskFormModal({ open, onOpenChange, onSubmit }) {
    const [form, setForm] = useState(emptyForm);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleOpenChange(nextOpen) {
        if (!nextOpen) setForm(emptyForm);
        onOpenChange(nextOpen);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!form.title.trim()) return;

        onSubmit(form);
        handleOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
                <DialogTitle>Create task</DialogTitle>
                <DialogDescription>
                Add a new task to your workspace.
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
                onChange={(event) =>
                    updateField("description", event.target.value)
                }
                placeholder="Optional details"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                    value={form.priority}
                    onValueChange={(value) => updateField("priority", value)}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue>
                        {PRIORITIES.find((item) => item.value === form.priority)?.label}
                    </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                    {PRIORITIES.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>

                <div className="space-y-2">
                <Label>Status</Label>
                <Select
                    value={form.status}
                    onValueChange={(value) => updateField("status", value)}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue>
                        {openStatuses.find((item) => item.value === form.status)?.label}
                    </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                    {openStatuses.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                        {item.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
            </div>

            <DialogFooter>
                <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                >
                Cancel
                </Button>
                <Button type="submit" disabled={!form.title.trim()}>
                Create task
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}

export default TaskFormModal;