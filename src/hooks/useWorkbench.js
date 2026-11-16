import { useContext } from "react";
import { WorkbenchContext } from "@/context/WorkbenchContext";

export function useWorkbench() {
    const context = useContext(WorkbenchContext);

    if (context === null) {
        throw new Error("useWorkbench must be used inside <WorkbenchProvider>");
    }

    return context;
}