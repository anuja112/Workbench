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
import { PRIORITIES } from "@/lib/tasks";

function ProjectFormModal({ project = null, onSubmit, onClose }) {
    const isEditing = project !== null;

    const [form, setForm] = useState({
        name: project?.name ?? "",
        description: project?.description ?? "",
        priority: project?.priority ?? "medium",
        deadline: project?.deadline ?? "",
        repoUrl: project?.repoUrl ?? "",
    });

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!form.name.trim()) return;

        onSubmit(form);
        onClose();
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
                <DialogTitle>{isEditing ? "Edit project" : "Create project"}</DialogTitle>
                <DialogDescription>
                Projects group your tasks and track their progress.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
                <Label htmlFor="project-name">Project name</Label>
                <Input
                id="project-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. Portfolio website"
                autoFocus
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                id="project-description"
                rows={3}
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Optional details"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="project-repo">Repository link</Label>
                <Input
                id="project-repo"
                value={form.repoUrl}
                onChange={(event) => updateField("repoUrl", event.target.value)}
                placeholder="https://github.com/username/repository"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="project-deadline">Deadline</Label>
                <Input
                    id="project-deadline"
                    type="date"
                    value={form.deadline}
                    onChange={(event) => updateField("deadline", event.target.value)}
                />
                </div>

                <div className="space-y-2">
                <Label>Priority</Label>
                <OptionSelect
                    value={form.priority}
                    onChange={(value) => updateField("priority", value)}
                    options={PRIORITIES}
                    className="w-full"
                />
                </div>
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                Cancel
                </Button>
                <Button type="submit" disabled={!form.name.trim()}>
                {isEditing ? "Save changes" : "Create project"}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}

export default ProjectFormModal;