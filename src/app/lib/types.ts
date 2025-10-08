// Types for the RESPONSES configuration

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReportItemData = Record<string, any> | null;

export interface ChatMessage {
  human: string | null;
  bot: string;
  report: boolean;
  reportitem?: ReportItemData;
}

export interface SlideData {
  [key: string]: ChatMessage[][];
}

export interface ResponsesConfig {
  Slides: SlideData;
}

export interface ChatStep {
  slide: string;
  data: ChatMessage;
}

export interface SuggestedQuestionMap {
  slide: string;
  reportItem: ReportItemData;
  botMsg: string;
}

