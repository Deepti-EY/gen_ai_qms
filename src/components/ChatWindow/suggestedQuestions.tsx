interface Props {
  suggestions: string[];
  onSelect: (q: string, idx: number) => void;
}

const SuggestedQuestions: React.FC<Props> = ({ suggestions, onSelect }) => (
  <div className="flex flex-wrap gap-3 justify-center">
    {suggestions.map((q, idx) => (
      <button
        key={q}
        className="bg-white px-4 py-2 rounded-xl shadow text-gray-700 hover:bg-gray-100 transition"
        onClick={() => onSelect(q, idx)}
      >
        {q}
      </button>
    ))}
  </div>
);

export default SuggestedQuestions;