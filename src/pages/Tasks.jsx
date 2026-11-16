import { useState } from "react";
import { ListTodo, Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import TaskFormModal from "@/components/tasks/TaskFormModal";
import TaskItem from "@/components/tasks/TaskItem";
import { useWorkbench } from "@/hooks/useWorkbench";

function Tasks() {
    const { tasks, addTask, toggleTask, deleteTask } = useWorkbench();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="space-y-6 p-6">
        <div className="flex items-start justify-between gap-4">
            <PageHeader title="Tasks" description="Manage your current work." />

            <Button onClick={() => setIsCreateOpen(true)}>
            <Plus />
            Add task
            </Button>
        </div>

        {tasks.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
            <ListTodo className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No tasks yet</p>
            <p className="text-sm text-muted-foreground">
                Add your first task to get started.
            </p>
            </div>
        ) : (
            <ul className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                />
            ))}
            </ul>
        )}

        <TaskFormModal
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            onSubmit={addTask}
        />
        </div>
    );
}

export default Tasks;