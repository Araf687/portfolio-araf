"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
  defaultValue?: string[];   // ✅ NEW
  onChange?: (values: string[]) => void;
};

export default function MultiSelect({
  options,
  placeholder = "Select options",
  defaultValue = [],
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------- */
  /* Set Default Values */
/* -------------------------------------------------- */

  useEffect(() => {
    if (!defaultValue.length) return;

    const defaults = options.filter((opt) =>
      defaultValue.includes(opt.value)
    );

    setSelected(defaults);
  }, [defaultValue, options]);

  /* -------------------------------------------------- */
  /* Close Outside */
/* -------------------------------------------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------------------------------------- */
  /* Toggle */
/* -------------------------------------------------- */

  const toggleSelect = (option: Option) => {
    const exists = selected.find((s) => s.value === option.value);

    let newSelected;
    if (exists) {
      newSelected = selected.filter((s) => s.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }

    setSelected(newSelected);
    onChange?.(newSelected.map((s) => s.value));
  };

  const removeItem = (value: string) => {
    const newSelected = selected.filter((s) => s.value !== value);
    setSelected(newSelected);
    onChange?.(newSelected.map((s) => s.value));
  };

  /* -------------------------------------------------- */
  /* UI */
/* -------------------------------------------------- */

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Input */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="min-h-[40px] w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 px-2 py-1 flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm">{placeholder}</span>
        )}

        {selected.map((item) => (
          <span
            key={item.value}
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-sm text-gray-900"
          >
            {item.label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.value);
              }}
              className="text-red-600 ml-2"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-700 bg-gray-800 shadow">
          {options.map((option) => {
            const isSelected = selected.some(
              (s) => s.value === option.value
            );

            return (
              <li
                key={option.value}
                onClick={() => toggleSelect(option)}
                className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-600 flex justify-between ${
                  isSelected ? "bg-gray-700 font-medium" : ""
                }`}
              >
                {option.label}
                {isSelected && <span>✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
