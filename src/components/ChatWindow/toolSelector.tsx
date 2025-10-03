import { useState } from "react";
import { PiSlidersHorizontal } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { ToolList } from "@/app/lib/ToolList";

interface Props {
  value: string;
  onChange: (tool: string) => void;
}

const ToolSelector: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (tool: string) => {
    onChange(tool);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex gap-4 items-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg text-sm shadow-sm flex items-center gap-1.5"
          onClick={() => setOpen((p) => !p)}
        >
          Tools
          <PiSlidersHorizontal className="size-[18px]" />
        </button>

        {value && (
          <div className="bg-[#FFE600]/50 text-gray-700 py-1.5 px-2 rounded-lg flex gap-1 items-center text-xs">
            {value}
            <IoCloseOutline
              className="size-4 cursor-pointer"
              onClick={() => onChange("")}
            />
          </div>
        )}
      </div>

      {open && (
        <div className="absolute bottom-full mb-2 z-10 bg-white border border-gray-300 rounded-xl shadow-md w-48">
          {ToolList.map((tool) => (
            <button
              key={tool}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                tool === value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelect(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolSelector;
