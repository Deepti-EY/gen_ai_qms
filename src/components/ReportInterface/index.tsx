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
      <div className="text-[#131ed2] p-4 flex justify-between items-center border-b-2 border-black" style={{ backgroundColor: '#ffffff' }}>
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

      {/* Black Line Separator */}
      <div className="w-full bg-black mt-1"></div>

      {/* General Information Header - Gray Background */}
      <div className="bg-[#c0c0c0] px-4 py-2 border border-black">
        <div className="font-[700] text-black">General Information</div>
      </div>

      {/* General Information Fields */}
      <div className="p-4">
        {reportItem && reportItem["General Information"] && (
          <div className="text-sm space-y-2">
            {/* Row 1: Record Number | Initiation Date */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Record Number:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Record Number"] || ""}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initiation Date:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initiation Date"] || ""}</span>
              </div>
            </div>

            {/* Row 2: Initiator */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initiator:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initiator"] || ""}</span>
              </div>
              <div></div>
            </div>

            {/* Row 3: Initial TCD | Revised TCD */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initial TCD:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initial TCD"] || ""}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Revised TCD:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Revised TCD"] || ""}</span>
              </div>
            </div>

            {/* Row 4: Actual Closure Date | Date of Occurrence */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Actual Closure Date:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Actual Closure Date"] || ""}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Date of Occurrence:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Date of Occurrence"] || ""}</span>
              </div>
            </div>

            {/* Row 5: Delay logging Justification */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Delay logging Justification:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Delay logging Justification"] || ""}</span>
            </div>

            {/* Row 6: Initiating Department */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Initiating Department:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Initiating Department"] || ""}</span>
            </div>

            {/* Row 7: OOS Department */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">OOS Department:</span>
              <span className="text-gray-900">{reportItem["General Information"]["OOS Department"] || ""}</span>
            </div>

            {/* Row 8: Operating Unit */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Operating Unit:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Operating Unit"] || ""}</span>
            </div>

            {/* Row 9: Location */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Location:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Location"] || ""}</span>
            </div>

            {/* Short Description */}
            <div className="mt-3">
              <div className="font-semibold text-black">Short Description:</div>
              <div className="text-gray-900 mt-1">{reportItem["General Information"]["Short Description"] || reportItem?.["Short Description"] || ""}</div>
            </div>

            {/* Brief Description */}
            <div className="mt-3">
              <div className="font-semibold text-black">Brief Description:</div>
              <div className="text-gray-900 mt-1">{reportItem["General Information"]["Brief Description"] || reportItem?.["Brief Description"] || ""}</div>
            </div>

            {/* Product/Material Name */}
            <div className="flex mt-3">
              <span className="font-semibold text-black min-w-[180px]">Product /Material Name:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Product /Material Name"] || ""}</span>
            </div>

            {/* Sample Type */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Sample Type:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Sample Type"] || ""}</span>
            </div>

            {/* Others */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Others:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Others"] || ""}</span>
            </div>

            {/* Batch Type */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Batch Type:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Batch Type"] || ""}</span>
            </div>

            {/* Pack Details */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Pack Details (if Any):</span>
              <span className="text-gray-900">{reportItem["General Information"]["Pack Details (if Any)"] || ""}</span>
            </div>

            {/* Test Name */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Test Name:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Test Name"] || ""}</span>
            </div>

            {/* Test Method Reference No */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Test Method Reference No:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Test Method Reference No"] || ""}</span>
            </div>

            {/* Test Method Ref. Version No */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Test Method Ref. Version No.:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Test Method Ref. Version No."] || ""}</span>
            </div>
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