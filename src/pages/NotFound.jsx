import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">Page not found</h2>
        <p className="text-sm text-muted-foreground">
            That page does not exist.
        </p>
        <Link
            to="/dashboard"
            className="mt-2 text-sm font-medium text-brand hover:underline"
        >
            Back to dashboard
        </Link>
        </div>
    );
}

export default NotFound;