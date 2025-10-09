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

const suggestedQuestionMap: SuggestedQuestionMap[] = [
  {
    slide: "Slide1",
    reportItem:
      (RESPONSES.Slides["Slide1"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: RESPONSES.Slides["Slide1"].slice(-1)[0][0].bot,
    flattenedIndex: lastIndexOfSlide("Slide1"),
  },
  {
    slide: "Slide2",
    reportItem:
      (RESPONSES.Slides["Slide2"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: RESPONSES.Slides["Slide2"].slice(-1)[0][0].bot,
    flattenedIndex: lastIndexOfSlide("Slide2"),
  },
  {
    slide: "Slide3",
    reportItem:
      (RESPONSES.Slides["Slide3"].slice(-1)[0][0] as { reportitem?: ReportItemData })
        .reportitem ?? null,
    botMsg: RESPONSES.Slides["Slide3"].slice(-1)[0][0].bot,
    flattenedIndex: lastIndexOfSlide("Slide3"),
  },
];

interface Props {
  // onReportUpdate now accepts third arg: isFinalForSlide boolean
  onReportUpdate: (reportItem: ReportItemData | null, slide: string, isFinalForSlide?: boolean) => void;
}

const ChatWindow: React.FC<Props> = ({ onReportUpdate }) => {
  const [history, setHistory] = useState<{ user?: string; bot?: string; thinking?: boolean }[]>([]);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [history]);

  const showEmptyState = history.length === 0;

  const ensureBotArray = (bot: string): string[] => {
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
    let lastProcessedIndex = -1;

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

        // show each message sequentially
        for (let m = 0; m < botMessages.length; m++) {
          setHistory((prev) => [...prev, { thinking: true }]);
          await sleep(m === 0 ? FIRST_DELAY : FOLLOW_UP_DELAY);
          setHistory((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { bot: botMessages[m] ?? "" };
            return updated;
          });
          lastProcessedIndex = i; // mark that we displayed this step (lastProcessedIndex refers to flattened step)
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
      const next = await processFromIndex(start, map.botMsg);
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
                      {item.thinking ? <div className="text-gray-400 italic">Thinking...</div> : <div className="text-gray-900">{item.bot}</div>}
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