const tones = {
    neutral: "bg-muted text-neutral-ink",
    info: "bg-info-soft text-info-ink",
    success: "bg-success-soft text-success-ink",
    danger: "bg-danger-soft text-danger-ink",
    brand: "bg-brand/10 text-brand",
};

function Tag({ tone = "neutral", children }) {
    return (
        <span
        className={`inline-flex items-center whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
        >
        {children}
        </span>
    );
}

export default Tag;