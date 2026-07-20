interface InputProps {
    placeholder: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type?: string;
}

export const Input = ({ placeholder, name, value, onChange, onKeyDown, type = "text" }: InputProps) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-btn-primary-bg focus:border-transparent transition-all"
        />
    );
};