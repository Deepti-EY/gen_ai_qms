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
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between h-12 bg-gray-100 items-center shadow px-8 py-3 shrink-0">
        <h1 className="text-base text-gray-700">Gen AI QMS</h1>
        <a href="/home">
          <h1 className="mr-5 hover:font-bold">Home</h1>
        </a>
      </div>
      <div className="flex py-2 w-full h-[calc(100%-50px)]">
        <div className="w-1/2 h-full flex flex-col">
          <ChatWindow chatSteps={chatSteps} onReportUpdate={handleReportUpdate} />
        </div>
        <div className="w-1/2 h-full flex flex-col border-l border-gray-200 bg-gray-50">
          <ReportInterface reportItem={reportItem} slide={slide} />
        </div>
      </div>
    </div>
  );
}