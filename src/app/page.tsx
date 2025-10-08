"use client";

import ChatWindow from "@/components/ChatWindow";
import ReportInterface from "@/components/ReportInterface";
import { useState } from "react";
import { RESPONSES } from "./lib/config";
// Import your JSON here

// Flatten slides as per above
const chatSteps: { slide: string, data: any }[] = [];
Object.entries(RESPONSES.Slides).forEach(([slide, arr]) => {
  arr.forEach((itemArr: any[], idx: number) => {
    chatSteps.push({ slide, data: itemArr[0] });
  });
});

export default function Home() {
  const [reportItem, setReportItem] = useState<any>(null);
  const [slide, setSlide] = useState<string>("");

  function handleReportUpdate(item: any, slideKey: string) {
    setReportItem(item);
    setSlide(slideKey);
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
        <div className="w-1/2 flex flex-col overflow-hidden min-h-0">
          <ChatWindow chatSteps={chatSteps} onReportUpdate={handleReportUpdate} />
        </div>
        <div className="w-1/2 flex flex-col border-l border-gray-200 bg-gray-50 overflow-hidden min-h-0">
          <ReportInterface reportItem={reportItem} slide={slide} />
        </div>
      </div>
    </div>
  );
}