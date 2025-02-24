"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQRData } from "@/context/qrdata-context";

export function ComboBox({
  items,
  fieldType,
  placeholder,
}: {
  items: { value: string; label: string }[];
  fieldType: "course" | "venue";
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const { data, setData } = useQRData();
  const selectedItem = items.find((item) => item.value === data[fieldType]);

  const placeholderText =
    placeholder ||
    `Select ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:w-60 justify-between bg-white"
        >
          {selectedItem ? selectedItem.label : placeholderText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 min-w-full">
        <Command>
          <CommandInput
            placeholder={`Search ${
              fieldType.charAt(0).toUpperCase() + fieldType.slice(1)
            }...`}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    setData((prev) => ({ ...prev, [fieldType]: item.value }));
                    setOpen(false);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
