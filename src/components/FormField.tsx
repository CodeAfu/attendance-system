import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "date";
  placeholder?: string;
  divArgs?: string;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  id,
  label,
  type,
  placeholder,
  divArgs,
  onChangeHandler,
}: FormFieldProps) {
  if (!id || !label || !type) {
    return null;
  }
  return (
    <div className={divArgs}>
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder ?? ""}
        onChange={onChangeHandler}
      />
    </div>
  );
}
