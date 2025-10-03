import React, { useState } from "react";
import ChatInput from "./chatInput";
import SuggestedQuestions from "./suggestedQuestions";
import { SUGGESTED_QUESTION } from "@/app/lib/ToolList";
import { RESPONSES } from "@/app/lib/config";

// Flatten chat steps as before
const chatSteps = [];
Object.entries(RESPONSES.Slides).forEach(([slide, arr]) => {
  arr.forEach((itemArr, idx) => {
    chatSteps.push({ slide, data: itemArr[0] });
  });
});

// Map suggested question index to the appropriate report item and bot message from last index
const suggestedQuestionMap = [
  {
    slide: "Slide1",
    reportItem: RESPONSES.Slides["Slide1"].slice(-1)[0][0].reportitem,
    botMsg: RESPONSES.Slides["Slide1"].slice(-1)[0][0].bot
  },
  {
    slide: "Slide2",
    reportItem: RESPONSES.Slides["Slide2"].slice(-1)[0][0].reportitem,
    botMsg: RESPONSES.Slides["Slide2"].slice(-1)[0][0].bot
  },
  {
    slide: "Slide3",
    reportItem: RESPONSES.Slides["Slide3"].slice(-1)[0][0].reportitem,
    botMsg: RESPONSES.Slides["Slide3"].slice(-1)[0][0].bot
  }
];

interface Props {
  chatSteps: { slide: string, data: any }[];
  onReportUpdate: (reportItem: any, slide: string) => void;
}

const ChatWindow: React.FC<Props> = ({ chatSteps, onReportUpdate }) => {
  const [history, setHistory] = useState<
    { user: string, bot: string, thinking?: boolean }[]
  >([]);
  const [stepIdx, setStepIdx] = useState(0);

  // Track if we're showing the initial empty state
  const showEmptyState = history.length === 0;

  // Handler for suggested question selection
  const handleSuggestedQuestion = (idx: number) => {
    const selected = SUGGESTED_QUESTION[idx];
    setHistory(prev => [...prev, { user: selected, bot: "", thinking: true }]);
    setTimeout(() => {
      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          bot: suggestedQuestionMap[idx].botMsg,
          thinking: false
        };
        return updated;
      });
      onReportUpdate(
        suggestedQuestionMap[idx].reportItem,
        suggestedQuestionMap[idx].slide
      );
      setStepIdx((idx) => idx + 1);
    }, 2000);
  };

  // Handler for sending a custom chat message
  const handleSend = (msg: string) => {
    if (stepIdx >= chatSteps.length) return;
    setHistory((prev) => [...prev, { user: msg, bot: "", thinking: true }]);
    setTimeout(() => {
      setHistory((prev) => {
        const resp = chatSteps[stepIdx];
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          bot: resp.data.bot,
          thinking: false,
        };
        return updated;
      });
      if (chatSteps[stepIdx].data.report) {
        onReportUpdate(chatSteps[stepIdx].data.reportitem, chatSteps[stepIdx].slide);
      }
      setStepIdx((idx) => idx + 1);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-full items-center text-sm overflow-hidden p-6">
      {showEmptyState ? (
        <div className="flex flex-col items-center justify-center h-full w-full gap-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            What are you looking for?
          </h1>
          <SuggestedQuestions
            suggestions={SUGGESTED_QUESTION}
            onSelect={(q, idx) => handleSuggestedQuestion(idx)}
          />
          <div className="w-full max-w-5xl">
            <ChatInput
              onSubmit={handleSend}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full flex-1 px-4 py-4 overflow-y-auto">
            {history.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex justify-end">
                  <div className="bg-gray-900 text-white px-5 py-3 rounded-xl max-w-lg">
                    {item.user}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-xl shadow max-w-lg">
                    {item.thinking ? (
                      <div className="text-gray-400 italic">Thinking...</div>
                    ) : (
                      <div className="text-gray-900">{item.bot}</div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="w-full max-w-5xl">
            <ChatInput
              onSubmit={handleSend}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;