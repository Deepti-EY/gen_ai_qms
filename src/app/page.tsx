"use client";

import ChatWindow from "@/components/ChatWindow";
import ReportInterface from "@/components/ReportInterface";
import { useState } from "react";
import { RESPONSES } from "./lib/config";
import type { ChatStep, ReportItemData } from "./lib/types";
const chatSteps: ChatStep[] = [];
Object.entries(RESPONSES.Slides).forEach(([slide, arr]) => {
  arr.forEach((itemArr) => {
    chatSteps.push({ slide, data: itemArr[0] });
  });
});

export default function Home() {
  const [reportItem, setReportItem] = useState<ReportItemData>(RESPONSES.Slides["Slide1"][0][0].reportitem || null);
  const [slide, setSlide] = useState<string>("Slide1");
  const [showQualityButton, setShowQualityButton] = useState<boolean>(false);
  function handleReportUpdate(item: ReportItemData | null, slideKey: string, isFinalForSlide?: boolean) {
    setReportItem(item);
    setSlide(slideKey);
    setShowQualityButton(Boolean(isFinalForSlide && slideKey === "Slide5"));
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex justify-between h-12 bg-gray-100 items-center shadow px-8 py-3 shrink-0">
        <h1 className="text-base text-gray-700">Gen AI QMS</h1>
        <a href="/home">
          <h1 className="mr-5 hover:font-bold">Home</h1>
        </a>
      </div>
      <div className="flex w-full flex-1 overflow-hidden min-h-0">
        <div className="w-2/5 flex flex-col overflow-hidden min-h-0">
          <ChatWindow  onReportUpdate={handleReportUpdate} currentReportItem={reportItem} />
        </div>
        <div className="w-3/5 flex flex-col border-l border-gray-200 bg-gray-50 overflow-hidden min-h-0">
<ReportInterface reportItem={reportItem} slide={slide} showQualityButton={showQualityButton} />        </div>
      </div>
    </div>
  );
}