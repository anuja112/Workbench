function PageHeader({ title, description }) {
    return (
        <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        </div>
    );
}

export default PageHeader;