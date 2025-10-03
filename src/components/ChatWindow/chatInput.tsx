import { useRef } from "react";
import { FiSend } from "react-icons/fi";
import ToolSelector from "./toolSelector";

interface Props {
  onSubmit: (message: string) => void;
}

const ChatInput: React.FC<Props> = ({
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const handleSend = () => {
    const val = textareaRef.current?.value.trim() || "";
    if (!val) return;
    onSubmit(val);
    if (textareaRef.current) textareaRef.current.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-2xl shadow-sm flex flex-col gap-1 px-3 py-2">
      <div className="relative flex-grow flex items-center">
        <textarea
          ref={textareaRef}
          rows={1}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full py-2 pr-14 text-sm text-gray-800 resize-none outline-none max-h-20 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-5 -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-full"
        >
          <FiSend className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
