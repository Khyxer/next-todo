import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const InputLabel = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.id ?? props.name}
        className="text-lg font-medium text-gray-700 dark:text-gray-300 pb-1"
      >
        {props.name}
      </label>
      <input
        id={props.id ?? props.name}
        {...props}
        className={`w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900 text-lg duration-150 ${
          props.type === "password" ? "pr-10" : ""
        } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

interface SelectOption {
  value: string;
  label: string;
}

interface InputSelectProps {
  id?: string;
  name?: string;
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const InputSelect = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
  className = "",
}: InputSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(
    options.find((o) => o.value === value) ?? null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelected(options.find((o) => o.value === value) ?? null);
  }, [value, options]);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    onChange?.(option.value);
    setOpen(false);
  };

  const inputId = id ?? name;

  return (
    <div className={`flex flex-col ${className}`} ref={containerRef}>
      {(label || name) && (
        <label
          htmlFor={inputId}
          className="text-lg font-medium text-gray-700 dark:text-gray-300 pb-1"
        >
          {label ?? name}
        </label>
      )}

      <div className="relative">
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={`
            w-full px-3 py-1.5 rounded-xl bg-white border text-left text-lg duration-150
            flex items-center justify-between gap-2
            border-gray-300 dark:bg-neutral-900 dark:border-zinc-700
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400 dark:hover:border-zinc-500"}
            ${open ? "ring-2 ring-gray-400 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900" : ""}
          `}
        >
          <span
            className={
              selected
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1.5 w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg dark:shadow-black/40 py-1 overflow-auto max-h-60"
          >
            {options.map((option) => {
              const isSelected = selected?.value === option.value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={`
                    px-3 py-2 text-lg cursor-pointer flex items-center justify-between gap-2
                    transition-colors duration-100
                    ${
                      isSelected
                        ? "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                    }
                  `}
                >
                  {option.label}
                  {isSelected && (
                    <Check className="w-4 h-4 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
