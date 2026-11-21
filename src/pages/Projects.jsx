import { useState } from "react";
import { FolderKanban, Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ProjectFormModal from "@/components/projects/ProjectFormModal";
import ProjectItem from "@/components/projects/ProjectItem";
import { Button } from "@/components/ui/button";
import { getProjectStats } from "@/lib/projects";
import { useWorkbench } from "@/context/WorkbenchProvider";

function Projects() {
    const { projects, tasks, addProject, updateProject, deleteProject } = useWorkbench();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    function openCreate() {
        setEditingProject(null);
        setIsFormOpen(true);
    }

    function openEdit(project) {
        setEditingProject(project);
        setIsFormOpen(true);
    }

    function handleSubmit(data) {
        if (editingProject) {
        updateProject(editingProject.id, data);
        } else {
        addProject(data);
        }
    }

    function handleDelete(project) {
        const { total } = getProjectStats(project, tasks);
        const warning =
        total > 0 ? `\n\nIts ${total} ${total === 1 ? "task" : "tasks"} will be deleted too.` : "";

        if (window.confirm(`Delete "${project.name}"?${warning}`)) {
        deleteProject(project.id);
        }
    }

    return (
        <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
            <PageHeader
            title="Projects"
            description="Organize your work into projects."
            />

            <Button onClick={openCreate}>
            <Plus />
            New project
            </Button>
        </div>

        {projects.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
            <FolderKanban className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No projects yet</p>
            <p className="text-sm text-muted-foreground">
                Create a project, then link tasks to it to see progress.
            </p>
            </div>
        ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectItem
                key={project.id}
                project={project}
                stats={getProjectStats(project, tasks)}
                onEdit={openEdit}
                onDelete={handleDelete}
                />
            ))}
            </div>
        )}

        {isFormOpen && (
            <ProjectFormModal
            project={editingProject}
            onSubmit={handleSubmit}
            onClose={() => setIsFormOpen(false)}
            />
        )}
        </div>
    );
}

export default Projects;