import { SquareTerminal } from "lucide-react";

function AppIdentity() {
    return (
        <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <SquareTerminal className="h-5 w-5" />
        </div>

        <div className="min-w-0">
            <p className="text-lg font-semibold leading-none tracking-tight text-foreground">
            Workbench
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
            Developer workspace
            </p>
        </div>
        </div>
    );
}

export default AppIdentity;