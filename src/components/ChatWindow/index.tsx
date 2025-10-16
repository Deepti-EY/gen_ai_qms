import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import SuggestedQuestions from "./suggestedQuestions";
import { SUGGESTED_QUESTION } from "@/app/lib/ToolList";
import { RESPONSES } from "@/app/lib/config";
import type { ChatStep, SuggestedQuestionMap, ReportItemData } from "@/app/lib/types";

/* build flattened chatSteps */
const chatSteps: ChatStep[] = [];
Object.entries(RESPONSES.Slides).forEach(([slide, arr]) => {
  arr.forEach((itemArr) => {
    chatSteps.push({ slide, data: itemArr[0] });
  });
});

const lastIndexOfSlide = (slideKey: string) => {
  for (let i = chatSteps.length - 1; i >= 0; i--) {
    if (chatSteps[i].slide === slideKey) return i;
  }
  return -1;
};

// Helper function to extract first bot message as string
const getFirstBotMessage = (bot: string | string[]): string => {
  return Array.isArray(bot) ? bot[0] : bot;
};

const suggestedQuestionMap: SuggestedQuestionMap[] = [
  {
    slide: "Slide1",
    reportItem:
      (RESPONSES.Slides["Slide1"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: getFirstBotMessage(RESPONSES.Slides["Slide1"].slice(-1)[0][0].bot),
    flattenedIndex: lastIndexOfSlide("Slide1"),
  },
  {
    slide: "Slide2",
    reportItem:
      (RESPONSES.Slides["Slide2"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: getFirstBotMessage(RESPONSES.Slides["Slide2"].slice(-1)[0][0].bot),
    flattenedIndex: lastIndexOfSlide("Slide2"),
  },
  {
    slide: "Slide3",
    reportItem:
      (RESPONSES.Slides["Slide3"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: getFirstBotMessage(RESPONSES.Slides["Slide3"].slice(-1)[0][0].bot),
    flattenedIndex: lastIndexOfSlide("Slide3"),
  },
];

interface Props {
  // onReportUpdate now accepts third arg: isFinalForSlide boolean
  onReportUpdate: (reportItem: ReportItemData | null, slide: string, isFinalForSlide?: boolean) => void;
  currentReportItem?: ReportItemData | null;
}

const ChatWindow: React.FC<Props> = ({ onReportUpdate, currentReportItem }) => {
  // Initialize with the first bot message from Slide1
  const [history, setHistory] = useState<{ user?: string; bot?: string | string[]; thinking?: boolean; checkbox?: boolean }[]>(() => {
    const slide1Data = RESPONSES.Slides["Slide1"][0][0];
    return [{
      bot: slide1Data.bot,
      checkbox: slide1Data.checkbox
    }];
  });
  const [stepIdx, setStepIdx] = useState<number>(1); // Start from index 1 since we already show the first message
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [history]);

  const showEmptyState = false; // Always show chat interface since we initialize with default message

  const ensureBotArray = (bot: string | string[]): string[] => {
    if (Array.isArray(bot)) return bot.map((b) => (typeof b === "string" ? b : String(b)));
    if (bot == null) return [];
    return [String(bot)];
  };

  const processFromIndex = async (startIdx: number, initialOverride?: string): Promise<number> => {
    if (startIdx < 0 || startIdx >= chatSteps.length) return startIdx;
    if (isProcessing) return startIdx;
    setIsProcessing(true);

    let i = startIdx;
    const FIRST_DELAY = 1000;
    const FOLLOW_UP_DELAY = 600;

    // Skip the first step (index 0) since we already show it by default
    if (i === 0) {
      i = 1;
    }

    while (i < chatSteps.length) {
      const step = chatSteps[i];
      const botMessages = ensureBotArray(step.data.bot);

      // first message override if provided
      if (initialOverride && botMessages.length > 0) {
        botMessages[0] = initialOverride;
        initialOverride = undefined;
      }

      if (botMessages.length === 0) {
        // still treat report
        if (step.data.report) {
          // compute whether this step is final for Slide5
          const isFinalForSlide = i === lastIndexOfSlide("Slide5");
          onReportUpdate(step.data.reportitem ?? null, step.slide, isFinalForSlide);
        }
      } else {
        // call report update once for step (flag computed later after we finish processing this step's messages)
        if (step.data.report) {
          // determine if this step is the last one of Slide5
          const isFinalForSlide = i === lastIndexOfSlide("Slide5");
          onReportUpdate(step.data.reportitem ?? null, step.slide, isFinalForSlide);
        }

        // show message with checkbox options if checkbox is true, otherwise show sequentially
        if (step.data.checkbox && botMessages.length > 1) {
          // Show all options in one message with checkboxes
          setHistory((prev) => [...prev, { thinking: true }]);
          await sleep(FIRST_DELAY);
          setHistory((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { 
              bot: botMessages, 
              checkbox: step.data.checkbox 
            };
            return updated;
          });
        } else {
          // show each message sequentially (original behavior)
          for (let m = 0; m < botMessages.length; m++) {
            setHistory((prev) => [...prev, { thinking: true }]);
            await sleep(m === 0 ? FIRST_DELAY : FOLLOW_UP_DELAY);
            setHistory((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { bot: botMessages[m] ?? "" };
              return updated;
            });
          }
        }
      }

      i += 1;

      // stop auto-draining when next expects human input
      if (i < chatSteps.length && chatSteps[i].data.human !== null) break;
    }

    setIsProcessing(false);
    return i;
  };

  const handleSend = async (msg: string) => {
    if (isProcessing) return;
    setHistory((prev) => [...prev, { user: msg }]);

    if (stepIdx >= chatSteps.length) {
      setHistory((prev) => [...prev, { bot: "No further responses available." }]);
      return;
    }

    const next = await processFromIndex(stepIdx);
    setStepIdx(next);
  };

  const handleSuggestedQuestion = async (idx: number) => {
    if (isProcessing) return;
    const selected = SUGGESTED_QUESTION[idx];
    const map = suggestedQuestionMap[idx];

    setHistory((prev) => [...prev, { user: selected }]);

    const start = typeof map.flattenedIndex === "number" ? map.flattenedIndex : -1;
    if (start >= 0) {
      // For Slide1, start from index 1 since we already show the default message
      const adjustedStart = map.slide === "Slide1" ? 1 : start;
      const next = await processFromIndex(adjustedStart, map.botMsg);
      // ensure report update for mapping entry if provided (processFromIndex also calls it already)
      if (map.reportItem) {
        const isFinalForSlide = start === lastIndexOfSlide("Slide5");
        onReportUpdate(map.reportItem, map.slide, isFinalForSlide);
      }
      setStepIdx(next);
    } else {
      setHistory((prev) => [...prev, { bot: "No mapped report available for this suggestion." }]);
    }
  };

  const handleCheckboxClick = async (messageIdx: number, optionIdx: number) => {
    if (isProcessing) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [messageIdx]: optionIdx
    }));

    const historyItem = history[messageIdx];
    if (historyItem.bot && Array.isArray(historyItem.bot)) {
      const selectedText = historyItem.bot[optionIdx];
      
      setHistory((prev) => [...prev, { user: selectedText }]);
      
      // Check if this is the initial Slide1 message and show report for "Sure, I would like to go ahead with the investigation"
      if (messageIdx === 0 && selectedText === "Sure, I would like to go ahead with the investigation") {
        const slide1Data = RESPONSES.Slides["Slide1"][0][0];
        if (slide1Data.report && slide1Data.reportitem) {
          onReportUpdate(slide1Data.reportitem, "Slide1", false);
        }
        
        // Continue with the normal flow
        const next = await processFromIndex(stepIdx);
        setStepIdx(next);
        return;
      }

      // Check if user selected CAPA generation option
      if (selectedText === "The assigned root cause is confirmed and should be taken ahead for the CAPA generation.") {
        // Find the corresponding step in Slide5 that contains CAPA generation data
        const slide5Steps = RESPONSES.Slides["Slide5"];
        for (const stepArr of slide5Steps) {
          const step = stepArr[0];
          if (step.human === selectedText && step.report && step.reportitem) {
            onReportUpdate(step.reportitem, "Slide5", false);
            break;
          }
        }
      }

      if (selectedText === "Proceed to draft the OOS report") {
        onReportUpdate(currentReportItem ?? null, "Slide5", true);
        setHistory((prev) => [...prev, { 
          bot: "Please click the 'OOS Investigation Report Draft 1' button below to generate and download the report." 
        }]);
        return;
      }
      
      const next = await processFromIndex(stepIdx);
      setStepIdx(next);
    }
  };

  const handleProceedClick = async () => {
    if (isProcessing) return;

    setHistory((prev) => [...prev, { user: "Proceed" }]);
    
    const next = await processFromIndex(stepIdx);
    setStepIdx(next);
  };

  const shouldShowProceedButton = (botMessage: string | string[] | undefined): boolean => {
    if (!botMessage) return false;
    if (typeof botMessage === 'string') {
      return botMessage.toLowerCase().includes('proceed');
    }
    if (Array.isArray(botMessage) && botMessage.length > 0) {
      return botMessage[0].toLowerCase().includes('proceed');
    }
    return false;
  };

  return (
    <div className="flex flex-col w-full h-full items-center text-sm overflow-hidden">
      {showEmptyState ? (
        <div className="flex flex-col items-center justify-center h-full w-full gap-6 p-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">What are you looking for?</h1>
          <SuggestedQuestions suggestions={SUGGESTED_QUESTION} onSelect={(q, i) => handleSuggestedQuestion(i)} />
          <div className="w-full max-w-5xl">
            <ChatInput onSubmit={handleSend} />
          </div>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="flex flex-col gap-4 w-full flex-1 px-4 py-4 overflow-y-auto">
            {history.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.user ? (
                  <div className="flex justify-end">
                    <div className="bg-gray-900 text-white px-5 py-3 rounded-xl max-w-lg break-words">{item.user}</div>
                  </div>
                ) : null}

                {(item.thinking || item.bot) ? (
                  <div className="flex justify-start mt-2">
                    <div className="bg-white px-5 py-3 rounded-xl shadow max-w-lg break-words">
                      {item.thinking ? (
                        <div className="text-gray-400 italic">Thinking...</div>
                      ) : item.checkbox && Array.isArray(item.bot) ? (
                        <div className="text-gray-900 space-y-2">
                          <div className="mb-3">{item.bot[0]}</div>
                          <div className="space-y-2">
                            {item.bot.slice(1).map((option, optionIdx) => (
                              <div 
                                key={optionIdx} 
                                className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                                onClick={() => handleCheckboxClick(idx, optionIdx + 1)}
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  <input 
                                    type="checkbox" 
                                    checked={selectedOptions[idx] === optionIdx + 1}
                                    onChange={() => {}} // Handled by onClick
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                  />
                                </div>
                                <div className="text-gray-900 text-sm leading-relaxed">{option}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : shouldShowProceedButton(item.bot) ? (
                        <div className="text-gray-900 space-y-3">
                          <div>{item.bot && (typeof item.bot === 'string' ? item.bot : item.bot[0])}</div>
                          <button
                            onClick={handleProceedClick}
                            disabled={isProcessing}
                            className="bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Proceed
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-900">{item.bot}</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <div className="w-full max-w-5xl px-4 pb-4 shrink-0">
            <ChatInput onSubmit={handleSend} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;