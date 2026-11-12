function PageHeader({ title, description }) {
    return (
        <div>
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {description && (
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
        )}
        </div>
    );
}

export default PageHeader;