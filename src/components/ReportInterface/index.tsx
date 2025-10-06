import React from "react";

const Slide1Template = ({ reportItem }: { reportItem: any }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-gray-300 rounded-lg w-full bg-white shadow overflow-y-auto">
      {/* Header with Logo */}
      <div className="flex items-center p-2">
        <div className="text-lg font-semibold">Company logo</div>
      </div>

      {/* Out of Specification Title - White Background */}
      <div className="text-center py-0 bg-white">
        <div className="font-bold" style={{ color: '#131ed2' }}>
          {reportItem?.Title || "Out Of Specification"}
        </div>
      </div>

      {/* Blue Header Section with Division/Project, PRN, and Status */}
      <div className="text-[#131ed2] p-4 flex justify-between items-center" style={{ backgroundColor: '#ffffff' }}>
        <div>
          <div className="font-semibold mb-1">
            <span className="text-[#131ed2]">Division/Project:</span> <span className="font-[400]">{reportItem?.Title || "GMP/Out of Specification"}</span>
          </div>
          <div className="font-semibold">
            <span className="text-[#131ed2]">PR#:</span><span className="font-[400]">{reportItem?.PRN || "79374"}</span>
          </div>
        </div>
        <div className="font-semibold">
          <span className="text-[#131ed2]">Current State:</span> <span className="text-black font-[400]">{reportItem?.["Current State"] || "Ongoing"}</span>
        </div>
      </div>

      {/* General Information Header - Gray Background */}
      <div className="bg-gray-300 px-4 py-2 border-t border-b border-gray-400">
        <div className="font-bold text-black">General Information</div>
      </div>

      {/* General Information Fields */}
      <div className="p-4">
        {reportItem && reportItem["General Information"] && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {Object.entries(reportItem["General Information"]).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-semibold text-gray-700 min-w-[140px]">{key}:</span>
                <span className="text-gray-900">{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Additional Fields */}
        {reportItem?.["Short Description"] && (
          <div className="mt-4 text-sm">
            <div className="font-semibold text-gray-700">Short Description:</div>
            <div className="text-gray-900 mt-1">{reportItem["Short Description"]}</div>
          </div>
        )}
        
        {reportItem?.["Brief Description"] && (
          <div className="mt-3 text-sm">
            <div className="font-semibold text-gray-700">Brief Description:</div>
            <div className="text-gray-900 mt-1">{reportItem["Brief Description"]}</div>
          </div>
        )}
      </div>
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