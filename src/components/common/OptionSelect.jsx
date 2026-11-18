import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function OptionSelect({ value, onChange, options, className }) {
    const selected = options.find((option) => option.value === value);

    return (
        <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
            <SelectValue>{selected?.label}</SelectValue>
        </SelectTrigger>
        <SelectContent>
            {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
                {option.label}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    );
}

export default OptionSelect;