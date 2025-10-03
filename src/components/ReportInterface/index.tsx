import React from "react";

const Slide1Template = ({ reportItem }: { reportItem: any }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 w-full bg-white shadow overflow-y-auto">
      <div className="font-bold text-lg mb-2">{reportItem?.Title}</div>
      <div className="mb-4">PRN: {reportItem?.PRN}</div>
      <div className="mb-4">Status: {reportItem?.["Current State"]}</div>
      {/* General Information */}
      <div className="mb-2 font-semibold">General Information:</div>
      {reportItem && reportItem["General Information"] && (
        <ul>
          {Object.entries(reportItem["General Information"]).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {String(value)}</li>
          ))}
        </ul>
      )}
      <div className="mt-3">{reportItem?.["Short Description"]}</div>
      <div className="mt-1">{reportItem?.["Brief Description"]}</div>
    </div>
  </div>
);

// You can add more templates for Slide2, Slide3, etc.
const Slide2Template = ({ reportItem }: { reportItem: any }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 w-full bg-white shadow overflow-y-auto">
      <div className="font-bold text-lg mb-2">Work Bench Reviewers</div>
      <ul>
        {reportItem?.["Work Bench Reviewers"]?.map((r: any, i: number) => (
          <li key={i}>
            {r.Name} ({r.Designation}) - ID: {r["Employee ID"]}
          </li>
        ))}
      </ul>
      {/* Add more fields as needed */}
    </div>
  </div>
);

const ReportInterface: React.FC<{ reportItem: any, slide: string }> = ({ reportItem, slide }) => {
  if (!reportItem) return (
    <div className="flex h-full w-full items-center justify-center text-gray-400">
      No report to show.
    </div>
  );
  // Render template based on slide
  switch (slide) {
    case "Slide1": return <Slide1Template reportItem={reportItem} />;
    case "Slide2": return <Slide2Template reportItem={reportItem} />;
    // Add Slide3, Slide4, etc.
    default: return <div>Unknown slide template: {slide}</div>;
  }
};

export default ReportInterface;