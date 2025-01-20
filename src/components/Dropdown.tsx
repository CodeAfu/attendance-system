"use client";
import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
// import { CheckIcon } from '@heroicons/react/20/solid'

interface DropdownProps<T> {
  items: T[];
  labelProperty: (item: T) => string;
  onChange?: (selectedItem: T) => void;
  classArgs?: string;
}

export default function Dropdown<T>({
  items,
  labelProperty,
  onChange,
  classArgs,
}: DropdownProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleChange = (item: T) => {
    setSelectedItem(item);
    if (onChange) onChange(item);
  };

  return (
    <div className={classArgs}>
      <Listbox value={selectedItem} onChange={handleChange}>
        <ListboxButton className="p-2 border rounded">
          {selectedItem ? labelProperty(selectedItem) : "Select an option"}
        </ListboxButton>
        <ListboxOptions anchor="bottom start">
          {items.map((item, index) => (
            <ListboxOption
              key={index}
              value={item}
              className="group flex gap-2 px-4 py-2 cursor-pointer bg-white data-[focus]:bg-blue-100"
            >
              {labelProperty(item)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
