'use client';
import { useId } from 'react';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

export default function DateTimePicker({
  label,
  value,
  onChange,
  name,
  className = '',
}: DateTimePickerProps) {
  const autoId = useId();
  const inputId = name || autoId;

  return (
    <div className={`relative w-64 ${className}`}>      
      <input
        id={inputId}
        type="datetime-local"
        placeholder=" "
        className="peer border rounded-full px-4 py-4 w-full bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-foreground)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        htmlFor={inputId}
        className={`absolute rounded-full left-4 text-[var(--color-foreground)] text-base transition-all
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-[var(--color-foreground)]/50
          peer-focus:top-[-12px]
          peer-focus:text-sm
          peer-focus:text-[var(--color-foreground)]
          bg-[var(--color-background)] px-1 cursor-text
          ${value ? 'top-[-12px] text-sm text-[var(--color-foreground)]' : ''}`}
      >
        {label}
      </label>
    </div>
  );
}
