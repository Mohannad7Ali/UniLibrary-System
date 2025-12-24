"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  const [color, setColor] = useState(value || "#000000");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onPickerChange(newColor); // إرسال اللون المختار للنموذج (Form)
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <div className="flex items-center gap-3">
          <PopoverTrigger asChild>
            <button
              type="button"
              className="size-10 rounded-md border border-gray-200 shadow-sm cursor-pointer"
              style={{ backgroundColor: color }}
              title="Choose color"
            />
          </PopoverTrigger>

          <Input
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="max-w-[120px] uppercase font-mono"
            placeholder="#000000"
          />
        </div>

        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={color} onChange={handleColorChange} />
          <div className="mt-3 text-center text-xs font-mono text-gray-500 uppercase">
            {color}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
