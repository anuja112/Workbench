import { useState } from "react";
import { ListTodo, Plus, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import OptionSelect from "@/components/common/OptionSelect";
import TaskFormModal from "@/components/tasks/TaskFormModal";
import TaskItem from "@/components/tasks/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRIORITIES, STATUSES } from "@/lib/tasks";
import { useWorkbench } from "@/context/WorkbenchProvider";

const statusOptions = [{ value: "all", label: "All statuses" }, ...STATUSES];
const priorityOptions = [{ value: "all", label: "All priorities" }, ...PRIORITIES];

function Tasks() {
    const { tasks, projects, addTask, updateTask, toggleTask, deleteTask } = useWorkbench();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [projectFilter, setProjectFilter] = useState("all");

    const projectOptions = [
        { value: "all", label: "All projects" },
        ...projects.map((project) => ({ value: project.id, label: project.name })),
    ];

    const query = search.trim().toLowerCase();

    const visibleTasks = tasks.filter((task) => {
        const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description ?? "").toLowerCase().includes(query);
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
        const matchesProject = projectFilter === "all" || task.projectId === projectFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesProject;
    });

    function openCreate() {
        setEditingTask(null);
        setIsFormOpen(true);
    }

    function openEdit(task) {
        setEditingTask(task);
        setIsFormOpen(true);
    }

    function handleSubmit(data) {
        if (editingTask) {
        updateTask(editingTask.id, data);
        } else {
        addTask(data);
        }
    }

    function handleDelete(task) {
        if (window.confirm(`Delete "${task.title}"?`)) {
        deleteTask(task.id);
        }
    }

    function clearFilters() {
        setSearch("");
        setStatusFilter("all");
        setPriorityFilter("all");
        setProjectFilter("all");
    }

    return (
        <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
            <PageHeader title="Tasks" description="Manage your current work." />

            <Button onClick={openCreate}>
            <Plus />
            Add task
            </Button>
        </div>

        {tasks.length > 0 && (
            <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-48 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks"
                    className="pl-9"
                    aria-label="Search tasks"
                />
                </div>

                <OptionSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                className="w-40"
                />
                <OptionSelect
                value={priorityFilter}
                onChange={setPriorityFilter}
                options={priorityOptions}
                className="w-40"
                />
                <OptionSelect
                value={projectFilter}
                onChange={setProjectFilter}
                options={projectOptions}
                className="w-40"
                />
            </div>

            <p className="text-xs text-muted-foreground">
                Showing {visibleTasks.length} of {tasks.length} tasks
            </p>
            </div>
        )}

        {tasks.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
            <ListTodo className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No tasks yet</p>
            <p className="text-sm text-muted-foreground">
                Add your first task to get started.
            </p>
            </div>
        ) : visibleTasks.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium text-foreground">
                No tasks match your filters
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear filters
            </Button>
            </div>
        ) : (
            <ul className="space-y-2">
            {visibleTasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                project={projects.find((project) => project.id === task.projectId)}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={handleDelete}
                />
            ))}
            </ul>
        )}

        {isFormOpen && (
            <TaskFormModal
            task={editingTask}
            onSubmit={handleSubmit}
            onClose={() => setIsFormOpen(false)}
            />
        )}
        </div>
    );
}

export default Tasks;