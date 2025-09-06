'use client';
import { useId } from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name?: string; // usado como id
  type?: string;
  className?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  name,
  type = "text",
  className = "",
}: TextInputProps) {
  const autoId = useId(); // genera un id único por si no se pasa `name`
  const inputId = name || autoId;

  return (
    <div className={`relative ${className}`}>
      <input
        id={inputId}
        type={type}
        placeholder=" "
        className="peer border rounded-full px-4 py-4 w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-foreground)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        htmlFor={inputId}
        className={`absolute rounded-full left-4 top-3 text-[var(--color-foreground)] text-base transition-all
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-[var(--color-foreground)]/50
          peer-focus:top-[-12]
          peer-focus:text-sm
          peer-focus:text-[var(--color-foreground)]
          bg-[var(--color-background)] px-1 cursor-text` +
          ` ${value.length > 0 && 'top-[-12] text-sm text-[var(--color-foreground)] '}`}
      >
        {label}
      </label>
    </div>
  );
}
