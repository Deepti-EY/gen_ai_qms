import React, { useMemo, useRef, useState } from "react";

import type { ReportItemData } from "@/app/lib/types";
import { RESPONSES } from "@/app/lib/config";
import jsPDF from "jspdf";

interface Reviewer {
  Name?: string;
  "Employee ID"?: string;
  Designation?: string;
}

interface Stakeholder {
  "Added On"?: string;
  "Added By"?: string;
  PID?: string;
  Comments?: string;
}

type RawStep = {
  human: string | null;
  bot?: string | string[];
  report?: boolean;
  reportitem?: ReportItemData;
};


type SlideReport = { slide: string; idx: number; reportItem: ReportItemData };


const Slide1Template = ({ reportItem }: { reportItem: ReportItemData }) => (
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
      <div className="text-[#131ed2] p-4 border-b-2 border-black" style={{ backgroundColor: '#ffffff' }}>
        <div className="font-semibold mb-1">
          <span className="text-[#131ed2]">Division/Project:</span> <span className="font-[400]">{reportItem?.Title || "GMP/Out of Specification"}</span>
        </div>
        <div className="font-semibold flex justify-between items-center">
          <div>
            <span className="text-[#131ed2]">PR#:</span><span className="font-[400]">{reportItem?.PRN || "79374"}</span>
          </div>
          <div>
            <span className="text-[#131ed2]">Current State:</span> <span className="text-black font-[400]">{reportItem?.["Current State"] || "Ongoing"}</span>
          </div>
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
                <span className="text-gray-900">{reportItem["General Information"]["Record Number"] || "ABC/GMP/OOS/2023-0044"}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initiation Date:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initiation Date"] || "23-02-2023 08:36"}</span>
              </div>
            </div>

            {/* Row 2: Initiator */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initiator:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initiator"] || "Mr A"}</span>
              </div>
              <div></div>
            </div>

            {/* Row 3: Initial TCD | Revised TCD */}
            <div className="grid grid-cols-2 gap-x-8">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Initial TCD:</span>
                <span className="text-gray-900">{reportItem["General Information"]["Initial TCD"] || "25-03-2023"}</span>
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
                <span className="text-gray-900">{reportItem["General Information"]["Date of Occurrence"] || "22-02-2023 23:23"}</span>
              </div>
            </div>

            {/* Row 5: Initiating Department */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Initiating Department:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Initiating Department"] || "Quality Control"}</span>
            </div>

            {/* Row 6: OOS Department */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">OOS Department:</span>
              <span className="text-gray-900">{reportItem["General Information"]["OOS Department"] || "Quality Control"}</span>
            </div>

            {/* Row 7: Operating Unit */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Operating Unit:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Operating Unit"] || "Unit X"}</span>
            </div>

            {/* Row 8: Location */}
            <div className="flex">
              <span className="font-semibold text-black min-w-[180px]">Location:</span>
              <span className="text-gray-900">{reportItem["General Information"]["Location"] || "Hyderabad"}</span>
            </div>

            {/* Brief Description */}
            <div className="mt-3">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Brief Description:</span>
                <div className="flex flex-col">
                <span className="text-gray-900">{reportItem["General Information"]["Brief Description"] || reportItem?.["Brief Description"] || "On 22-02-2023, poloxamer content test was performed for in process samples of ABC-00508841 Batch no: AB22000062, stage Kolliphor P188 bio 3% stock by the analyst Mr C (Emp ID: 10028810), as per STP No: STP-GMP-QCB-0081, version No: 5.0 and the analysis was performed using HPLC instrument ID:S/QCB/QCI/065/01. Analyst Mr. B (Emp ID: 10029835), verified the initial system suitability and the analysis was completed on 22-02-2023. After completion of poloxamer analysis, the data was compiled and the obtained results were found to be out of specification (Specification No: SPEC-GMP-QCB-5FG-830001939-IPS-0002). The data was reviewed and identified OOS on 22 Feb 2023 by Mr B (employee ID: 10026333) and OOS was reported in Trackwise on 23 Feb 2023 by Mr A (Emp ID: 10025300)."}</span>
             <div className="flex py-10">
             <div>
                <div className="font-semibold text-black mb-2">Obtained results are as follows:</div>
                <div className="text-gray-900 space-y-1">
                  <div>Injection-01: 32.20 g/L</div>
                  <div>Injection-02: 32.16 g/L</div>
                  <div>Injection-03: 31.32 g/L</div>
                  <div>Average three triplicate injection results: 31.9 g/L</div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-black mb-2">Desired State:</div>
                <div className="text-gray-900">The specification limit is 30.0 ±1.5 g/L</div>
              </div>
              </div>
              </div>
              </div>
            </div>
            {/* Product and Test Information Section */}
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Product/Material Name:</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Product /Material Name"] || "Product X (ABC-00508841)"}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Sample Type:</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Sample Type"] || "Other"}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Batch Type:</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Batch Type"] || "Commercial Batch"}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Test Method Ref. Version No.:</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Test Method Ref. Version No."] || "5.0"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Pack Details (if Any):</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Pack Details (if Any)"] || "NA"}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-black min-w-[180px]">Test Name:</span>
                  <span className="text-gray-900">{reportItem["General Information"]["Test Name"] || "Poloxamer content"}</span>
                </div>
              </div>
            </div>

            {/* Batch Details Section */}
            <div className="mt-4">
              <div className="flex">
                <span className="font-semibold text-black min-w-[180px]">Batch Details:</span>
                <div className="flex-1 grid grid-cols-2 gap-x-8">
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Batch No:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Batch No"] || "AA22000062"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">AR No:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["AR No"] || "200915"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Storage conditions:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Storage conditions"] || "2-8°c"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Inspection Lot No:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Inspection Lot No"] || "0000030586"}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Batch Size/QTY:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Batch Size/QTY"] || "50000 tablets"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Mfg date:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Mfg date"] || "25-02-2023"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Expiry date:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Expiry date"] || "25-02-2025"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-black min-w-[120px]">Remarks:</span>
                      <span className="text-gray-900">{reportItem["General Information"]["Remarks"] || "NA"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// You can add more templates for Slide2, Slide3, etc.
const Slide3Template = ({ reportItem }: { reportItem: ReportItemData }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-gray-300 rounded-lg w-full bg-white shadow overflow-y-auto">
      <div className="p-4">
        {/* Work Bench Reviewers Table */}
        {reportItem?.["Work Bench Reviewers"] && reportItem["Work Bench Reviewers"].length > 0 && (
          <div className="flex justify-center mb-6">
            <table className="border-collapse border border-black w-auto">
              <thead>
                <tr className="bg-white">
                  <th className="border border-black p-2 text-left font-semibold">Name and Department</th>
                  <th className="border border-black p-2 text-left font-semibold">Employee ID</th>
                  <th className="border border-black p-2 text-left font-semibold">Designation</th>
                </tr>
              </thead>
              <tbody>
                {(reportItem["Work Bench Reviewers"] as Reviewer[]).map((reviewer, i: number) => (
                  <tr key={i}>
                    <td className="border border-black p-2">{reviewer.Name || "XXX"}</td>
                    <td className="border border-black p-2">{reviewer["Employee ID"] || ""}</td>
                    <td className="border border-black p-2">{reviewer.Designation || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {reportItem?.Title && (
          <>
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-4">
              <div className="font-bold text-black">{reportItem.Title}</div>
            </div>

            {/* Workbench Evaluation */}
            {reportItem["Work Bench Evaluation"] && (
              <div className="mb-4">
                <span className="font-semibold text-black">Workbench Evaluation: </span>
                <span className="text-gray-900">{reportItem["Work Bench Evaluation"]}</span>
              </div>
            )}

            {/* Outcomes Section */}
            {reportItem.Outcomes && (
              <div className="mb-4">
                <div className="text-gray-900 mb-2">The outcomes from workbench analysis are given below</div>
                <ul className="list-none space-y-1 ml-4">
                  {reportItem.Outcomes.Analyst && (
                    <li className="text-gray-900">
                      <span className="mr-2">▶</span>
                      <span className="font-semibold">Analyst:</span> {reportItem.Outcomes.Analyst}
                    </li>
                  )}
                  {reportItem.Outcomes["Specification and STP"] && (
                    <li className="text-gray-900">
                      <span className="mr-2">▶</span>
                      <span className="font-semibold">Specification and STP:</span> {reportItem.Outcomes["Specification and STP"]}
                    </li>
                  )}
                  {reportItem.Outcomes["Chemicals and Reagents"] && (
                    <li className="text-gray-900">
                      <span className="mr-2">▶</span>
                      <span className="font-semibold">Chemical and reagents:</span> {reportItem.Outcomes["Chemicals and Reagents"]}
          </li>
                  )}
      </ul>
              </div>
            )}

            {/* Obvious Error Identified */}
            {reportItem["Obvious Error Identified"] && (
              <div className="mb-3">
                <div className="font-semibold text-black">Obvious Error Identified: {reportItem["Obvious Error Identified"]}</div>
              </div>
            )}

            {/* If Other Obvious Error */}
            {reportItem["If Other Obvious Error"] && (
              <div className="mb-4">
                <div className="font-semibold text-black">If Other Obvious Error: {reportItem["If Other Obvious Error"]}</div>
              </div>
            )}

            {/* Evaluation Outcome */}
            {reportItem["Evaluation Outcome"] && (
              <div className="mb-3">
                <span className="font-semibold text-black">Evaluation Outcome: </span>
                <span className="text-gray-900">{reportItem["Evaluation Outcome"]}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

const Slide2Template = ({ reportItem }: { reportItem: ReportItemData }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-gray-300 rounded-lg w-full bg-white shadow overflow-y-auto">
      <div className="p-4">
        {/* Analyst Evaluation Section */}
        {reportItem?.["Analyst Evaluation"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Analyst</div>
            </div>
            
            <div className="space-y-2">
              {reportItem["Analyst Evaluation"].Training && (
                <div className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">
                    <span className="font-semibold">Training - </span>
                    {reportItem["Analyst Evaluation"].Training}
                  </div>
                </div>
              )}
              
              {reportItem["Analyst Evaluation"].Specification && (
                <div className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">
                    <span className="font-semibold">Specification - </span>
                    {reportItem["Analyst Evaluation"].Specification}
                  </div>
                </div>
              )}
              
              {reportItem["Analyst Evaluation"].Sampling && (
                <div className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">
                    <span className="font-semibold">Sampling - </span>
                    {reportItem["Analyst Evaluation"].Sampling}
                  </div>
                </div>
              )}
              
              {reportItem["Analyst Evaluation"]["Test Procedure"] && (
                <div className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">
                    <span className="font-semibold">Test Procedure - </span>
                    {reportItem["Analyst Evaluation"]["Test Procedure"]}
                  </div>
                </div>
              )}
              
              {reportItem["Analyst Evaluation"]["Observation/Error"] && (
                <div className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">
                    <span className="font-semibold">Observation/Error - </span>
                    {reportItem["Analyst Evaluation"]["Observation/Error"]}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytical Method Evaluation Section */}
        {reportItem?.["Analytical Method Evaluation"] && (
          <div className="mb-6">
            <div>
              <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
                <div className="font-bold text-black">Analytical Method</div>
              </div>
              
              <div className="space-y-2">
                {reportItem["Analytical Method Evaluation"]["Method of Analysis"] && (
                  <div className="flex">
                    <span className="mr-2 text-gray-900">▶</span>
                    <div className="text-gray-900">
                      <span className="font-semibold">Method of Analysis - </span>
                      {reportItem["Analytical Method Evaluation"]["Method of Analysis"]}
                    </div>
                  </div>
                )}
                
                {reportItem["Analytical Method Evaluation"]["Analytical Method Validation"] && (
                  <div className="flex">
                    <span className="mr-2 text-gray-900">▶</span>
                    <div className="text-gray-900">
                      <span className="font-semibold">Analytical Method Validation - </span>
                      {reportItem["Analytical Method Evaluation"]["Analytical Method Validation"]}
                    </div>
                  </div>
                )}
                
                {reportItem["Analytical Method Evaluation"]["Specification Steps"] && (
                  <div className="flex">
                    <span className="mr-2 text-gray-900">▶</span>
                    <div className="text-gray-900">
                      <span className="font-semibold">Specification Steps - </span>
                      {reportItem["Analytical Method Evaluation"]["Specification Steps"]}
                    </div>
                  </div>
                )}
                
                {reportItem["Analytical Method Evaluation"]["OOS"] && (
                  <div className="flex">
                    <span className="mr-2 text-gray-900">▶</span>
                    <div className="text-gray-900">
                      <span className="font-semibold">OOS - </span>
                      {reportItem["Analytical Method Evaluation"]["OOS"]}
                    </div>
                  </div>
                )}
                
                {reportItem["Analytical Method Evaluation"]["Observation/Error"] && (
                  <div className="flex">
                    <span className="mr-2 text-gray-900">▶</span>
                    <div className="text-gray-900">
                      <span className="font-semibold">Observation/Error - </span>
                      {reportItem["Analytical Method Evaluation"]["Observation/Error"]}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Slide4Template = ({ reportItem }: { reportItem: ReportItemData }) => (
  <div className="flex h-full w-full p-6">
    <div className="border-2 border-gray-300 rounded-lg w-full bg-white shadow overflow-y-auto">
      <div className="p-4">
        {/* Checklist for Laboratory OOS Investigation Section */}
        {reportItem?.["Checklist for Laboratory OOS Investigation"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Checklist for Laboratory OOS Investigation</div>
            </div>
            
            <div className="space-y-2">
              {reportItem["Checklist for Laboratory OOS Investigation"].map((item: string, index: number) => (
                <div key={index} className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Incidents Section */}
        {reportItem?.["Past Incidents"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Past Incidents</div>
            </div>
            
            <div className="space-y-2">
              {reportItem["Past Incidents"].map((incident: string, index: number) => (
                <div key={index} className="flex">
                  <span className="mr-2 text-gray-900">▶</span>
                  <div className="text-gray-900">{incident}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Most Probable Root Cause Details Section */}
        {reportItem?.["Most Probable Root Cause Details"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Most Probable Root Cause Details</div>
            </div>
            
            <div className="text-gray-900">
              {reportItem["Most Probable Root Cause Details"]}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Slide5Template = ({
  reportItem,
  showQualityButton,
  onDownload,
}: {
  reportItem: ReportItemData;
  showQualityButton: boolean;
  onDownload: () => void;
}) => (  <div className="flex h-full w-full p-6">
    <div className="border-2 border-gray-300 rounded-lg w-full bg-white shadow overflow-y-auto">
      <div className="p-4">
        {/* Retesting HOD Review Section */}
        {reportItem?.["Retesting HOD Review"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Retesting HOD Review</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-900">
                <span className="font-semibold">Retesting HOD Review Comments: </span>
                {reportItem["Retesting HOD Review"].Status}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Retesting Review Completed By: </span>
                {reportItem["Retesting HOD Review"].Comments}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Retesting Review Completed On: </span>
                {reportItem["Retesting HOD Review"]["Retesting Review Completed On"]}
              </div>
            </div>
          </div>
        )}

        {/* Retesting QA Approval Section */}
        {reportItem?.["Retesting QA Approval"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Retesting QA Approval</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-900">
                <span className="font-semibold">Retesting QA Review Comments: </span>
                {reportItem["Retesting QA Approval"].Status}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Retesting Approved By: </span>
                {reportItem["Retesting QA Approval"].Comments}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Retesting Approved On: </span>
                {reportItem["Retesting QA Approval"]["Retesting Approved On"]}
              </div>
            </div>
          </div>
        )}

        {/* CAPA Generation Section */}
        {reportItem?.["CAPA Generation"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] text-black px-4 py-2 text-center mb-3">
              <div className="font-bold">CAPA generation</div>
            </div>
            
            <div className="space-y-4">
              {/* Corrective Actions */}
              {reportItem["CAPA Generation"]["Corrective Actions"] && (
                <div>
                  <div className="font-bold text-black mb-2">1. Corrective actions:</div>
                  <div className="ml-4 space-y-1">
                    {reportItem["CAPA Generation"]["Corrective Actions"].map((action: string, index: number) => (
                      <div key={index} className="flex">
                        <span className="mr-2 text-gray-900">▶</span>
                        <div className="text-gray-900">{action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preventive Actions */}
              {reportItem["CAPA Generation"]["Preventive Actions"] && (
                <div>
                  <div className="font-bold text-black mb-2">2. Preventive actions:</div>
                  <div className="ml-4 space-y-1">
                    {reportItem["CAPA Generation"]["Preventive Actions"].map((action: string, index: number) => (
                      <div key={index} className="flex">
                        <span className="mr-2 text-gray-900">▶</span>
                        <div className="text-gray-900">{action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stakeholders Review Section */}
        {reportItem?.["CAPA Generation"]?.["Stakeholders Review"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Stakeholders Review</div>
            </div>
            
            <div className="space-y-3">
              {(reportItem["CAPA Generation"]["Stakeholders Review"] as Stakeholder[]).map((stakeholder, index: number) => (
                <div key={index} className="text-gray-900">
                  <div className="font-semibold">Stakeholders Comments: {stakeholder["Added On"]} added by {stakeholder["Added By"]} ({stakeholder.PID}):</div>
                  <div className="ml-4">{stakeholder.Comments}</div>
                  {index < (reportItem["CAPA Generation"]["Stakeholders Review"] as Stakeholder[]).length - 1 && (
                    <div className="text-center my-2">**************************************************</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investigation Approval Section */}
        {reportItem?.["CAPA Generation"]?.["Investigation Approval"] && (
          <div className="mb-6">
            <div className="bg-[#c0c0c0] px-4 py-2 border border-black mb-3">
              <div className="font-bold text-black">Investigation Approval</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-900">
                <span className="font-semibold">QA Approval Comments: </span>
                {reportItem["CAPA Generation"]["Investigation Approval"]["QA Approval Comments"]}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Investigation Approved By: </span>
                {reportItem["CAPA Generation"]["Investigation Approval"]["Approved By"] || "Mr. C"}
              </div>
              <div className="text-gray-900">
                <span className="font-semibold">Investigation Approved On: </span>
                {reportItem["CAPA Generation"]["Investigation Approval"]["Approved On"]}
              </div>
              <div className="mt-6">
         {/* Render the button only when explicitly allowed */}
        {showQualityButton && (
          <div className="mt-6">
            <div
              className="bg-black text-[#ffe600] text-center py-3 px-4 rounded cursor-pointer"
                        onClick={onDownload}

            >
               <div className="font-bold">Automated Quality OOS Report</div>
            </div>
          </div>
        )}
        </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* Helper - flatten and fallback printer */
const buildPrintableLines = (obj: unknown, indent = 0): string[] => {
  const lines: string[] = [];
  const pad = " ".repeat(indent * 2);

  if (obj == null) return lines;

  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    lines.push(`${pad}${String(obj)}`);
    return lines;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      if (typeof item === "object") {
        lines.push(...buildPrintableLines(item, indent + 1));
      } else {
        lines.push(`${pad}- ${String(item)}`);
      }
    });
    return lines;
  }

  Object.entries(obj).forEach(([k, v]) => {
    if (v == null) {
      lines.push(`${pad}${k}:`);
    } else if (typeof v === "object") {
      lines.push(`${pad}${k}:`);
      lines.push(...buildPrintableLines(v, indent + 1));
    } else {
      lines.push(`${pad}${k}: ${String(v)}`);
    }
  });

  return lines;
};

/*
  ReportInterface: styled jsPDF generator (text-based)
  - No slide names printed
  - Labels on own line, values wrapped below
  - Removed the Quality OOS Report link text
  - Replaced `any` with proper types where practical
  - Conditional drawing: only render a section title when there is content to show
*/
const ReportInterface: React.FC<{
  reportItem: ReportItemData | null;
  slide: string;
  showQualityButton?: boolean;
}> = ({ reportItem, slide, showQualityButton = false }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const allReportItems: SlideReport[] = useMemo(() => {
    const res: SlideReport[] = [];
    Object.entries(RESPONSES.Slides).forEach(([slideName, arr]) => {
      arr.forEach((itemArr: unknown[]) => {
        const data = (itemArr as unknown[])[0] as RawStep | undefined;
        if (data && data.report && data.reportitem) {
          res.push({ slide: slideName, idx: res.length, reportItem: data.reportitem });
        }
      });
    });
    return res;
  }, []);

  // helpers to detect whether a section has meaningful content
  const hasSummary = (ri?: ReportItemData): boolean => {
    if (!ri) return false;
    if (ri.Title || ri.PRN || ri["Current State"]) return true;
    const gi = ri["General Information"];
    if (gi && typeof gi === "object") {
      return Object.values(gi).some((v) => v !== undefined && v !== null && String(v).trim() !== "");
    }
    return false;
  };

  const hasGeneralInformation = (ri?: ReportItemData): boolean => {
    if (!ri) return false;
    const gi = ri["General Information"];
    return !!(gi && Object.values(gi).some((v) => v !== undefined && v !== null && String(v).trim() !== ""));
  };

  const hasWorkBenchReviewers = (ri?: ReportItemData): ri is ReportItemData & { "Work Bench Reviewers": Reviewer[] } =>
    !!(ri && Array.isArray(ri["Work Bench Reviewers"]) && (ri["Work Bench Reviewers"] as Reviewer[]).length > 0);

  const hasOutcomes = (ri?: ReportItemData): boolean => !!(ri && ri["Outcomes"] && Object.keys(ri["Outcomes"]).length > 0);

  const hasChecklist = (ri?: ReportItemData): boolean =>
    !!(ri && Array.isArray(ri["Checklist for Laboratory OOS Investigation"]) && ri["Checklist for Laboratory OOS Investigation"].length > 0);

  const hasPastIncidents = (ri?: ReportItemData): boolean =>
    !!(ri && Array.isArray(ri["Past Incidents"]) && ri["Past Incidents"].length > 0);

  const hasCAPA = (ri?: ReportItemData): boolean => !!(ri && ri["CAPA Generation"] && Object.keys(ri["CAPA Generation"]).length > 0);

  const generatePDF = async () => {
    if (allReportItems.length === 0) {
      alert("No report content available for export.");
      return;
    }

    setIsGenerating(true);
    try {
      const jspdfModule = await import("jspdf");
const jsPDFCtor = (jspdfModule as typeof import("jspdf")).jsPDF 
  ?? (jspdfModule as typeof import("jspdf")).default 
  ?? jsPDF;
        if (!jsPDFCtor || typeof jsPDFCtor !== "function") {
        console.error("jsPDF constructor not found", jspdfModule);
        alert("Failed to load PDF generator (jsPDF).");
        setIsGenerating(false);
        return;
      }

      // Instantiate typed jsPDF
      const pdf = new (jsPDFCtor as new (opts?: { orientation?: string; unit?: string; format?: string }) => import("jspdf").jsPDF)({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Layout config
      const margin = 48;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      let cursorY = margin;
      const lineHeight = 16;

      const ensureSpace = (needed: number) => {
        if (cursorY + needed > pageHeight - margin) {
          pdf.addPage();
          cursorY = margin;
        }
      };

      // Cover header
      pdf.setFillColor(20, 47, 89);
      pdf.rect(0, 0, pageWidth, 70, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
       pdf.setFont("helvetica", "bold");
      pdf.text("Automated Quality OOS Report", margin, 44);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 60);
      cursorY = 90;

      // Divider (draw below the header area)
      ensureSpace(12);
      pdf.setDrawColor(200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, cursorY - 6, pageWidth - margin, cursorY - 6);
      cursorY += 12;

      // Helpers
      const drawSectionTitle = (title: string) => {
        ensureSpace(36);
        pdf.setFontSize(14);
        pdf.setFont("helvetica",  "bold");
        pdf.setTextColor(20, 47, 89);
        pdf.text(title, margin, cursorY);
        cursorY += 18;
        // draw divider under the title (safe position)
        ensureSpace(12);
        pdf.setDrawColor(230);
        pdf.setLineWidth(0.5);
        pdf.line(margin, cursorY - 6, pageWidth - margin, cursorY - 6);
        cursorY += 12;
        pdf.setTextColor(0, 0, 0);
      };

      const drawKeyValue = (label: string, value: string | number | null | undefined) => {
        ensureSpace(lineHeight);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        const labelText = label + ":";
        pdf.text(labelText, margin, cursorY);
        cursorY += lineHeight;

        // value lines indented
        pdf.setFont("helvetica", "normal");
        const valueText = value == null ? "" : String(value);
        const wrapped = pdf.splitTextToSize(valueText, usableWidth - 18);
        if (wrapped.length === 0) {
          cursorY += lineHeight / 2;
        } else {
          wrapped.forEach((line: string) => {
            ensureSpace(lineHeight);
            pdf.text(line, margin + 12, cursorY);
            cursorY += lineHeight;
          });
        }
      };

      const drawBulletedList = (items: string[]) => {
        items.forEach((it) => {
          ensureSpace(lineHeight);
          pdf.setFont("helvetica", "normal");
          const wrapped = pdf.splitTextToSize(it, usableWidth - 30);
          pdf.text("•", margin + 6, cursorY);
          wrapped.forEach((line: string, idx: number) => {
            if (idx > 0) ensureSpace(lineHeight);
            pdf.text(line, margin + 18, cursorY);
            cursorY += lineHeight;
          });
        });
      };

      const drawReviewersTable = (rows: Reviewer[]) => {
        if (!rows || rows.length === 0) return;
        ensureSpace(26);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("Work Bench Reviewers", margin, cursorY);
        cursorY += 16;

        // columns
        const col1 = margin;
        const col2 = margin + Math.round(usableWidth * 0.5);
        const col3 = margin + Math.round(usableWidth * 0.8);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        ensureSpace(lineHeight);
        pdf.text("Name", col1, cursorY);
        pdf.text("Employee ID", col2, cursorY);
        pdf.text("Designation", col3, cursorY);
        cursorY += 14;
        pdf.setDrawColor(220);
        pdf.setLineWidth(0.5);
        pdf.line(margin, cursorY - 6, pageWidth - margin, cursorY - 6);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        rows.forEach((r) => {
          ensureSpace(16);
          pdf.text(r.Name || "-", col1, cursorY);
          pdf.text(r["Employee ID"] || "-", col2, cursorY);
          pdf.text(r.Designation || "-", col3, cursorY);
          cursorY += 16;
        });

        cursorY += 8;
      };

      // Render all slides — NO slide name printed (per request)
      for (let s = 0; s < allReportItems.length; s++) {
        const ri = allReportItems[s].reportItem;

        // Summary section — only if there is content
        if (hasSummary(ri)) {
          drawSectionTitle("Summary");
          if (ri?.Title) drawKeyValue("Title", ri?.Title);
          if (ri?.PRN) drawKeyValue("PRN", ri?.PRN);
          if (ri?.["Current State"]) drawKeyValue("Current State", ri?.["Current State"]);
        }

        // General information
        if (hasGeneralInformation(ri)) {
          drawSectionTitle("General Information");
          const gi = ri?.["General Information"] || {};
          drawKeyValue("Record Number", (gi as Record<string, undefined>)["Record Number"] || "");
          drawKeyValue("Initiation Date", (gi as Record<string, undefined>)["Initiation Date"] || "");
          drawKeyValue("Initiating Department", (gi as Record<string, undefined>)["Initiating Department"] || "");
          drawKeyValue(
            "Delay Justification",
            (gi as Record<string, undefined>)["Delay Justification"] ||
              (gi as Record<string, undefined>)["Delay logging Justification"] ||
              ""
          );
          drawKeyValue("Short Description", (gi as Record<string, undefined>)["Short Description"] || ri?.["Short Description"] || "");
          drawKeyValue("Brief Description", (gi as Record<string, undefined>)["Brief Description"] || ri?.["Brief Description"] || "");
          drawKeyValue("Product/Material Name", (gi as Record<string, undefined>)["Product/Material Name"] || "");
        }

        if (hasWorkBenchReviewers(ri)) {
          drawSectionTitle("Work Bench Reviewers");
          drawReviewersTable(ri["Work Bench Reviewers"] as Reviewer[]);
        }

        if (hasOutcomes(ri)) {
          drawSectionTitle("Outcomes");
          const outcomes = ri?.["Outcomes"] as Record<string, unknown>;
          Object.entries(outcomes).forEach(([k, v]) => {
            drawKeyValue(k, typeof v === "string" ? v : JSON.stringify(v));
          });
        }

        if (hasChecklist(ri)) {
          drawSectionTitle("Checklist for Laboratory OOS Investigation");
          drawBulletedList(ri?.["Checklist for Laboratory OOS Investigation"] as string[]);
        }

        if (hasPastIncidents(ri)) {
          drawSectionTitle("Past Incidents");
          drawBulletedList(ri?.["Past Incidents"] as string[]);
        }

        if (hasCAPA(ri)) {
          drawSectionTitle("CAPA & CAPA Generation");
          const capa = ri?.["CAPA Generation"] as Record<string, unknown>;
          if (Array.isArray(capa["Corrective Actions"])) {
            drawKeyValue("Corrective Actions", "");
            drawBulletedList(capa["Corrective Actions"] as string[]);
          }
          if (Array.isArray(capa["Preventive Actions"])) {
            drawKeyValue("Preventive Actions", "");
            drawBulletedList(capa["Preventive Actions"] as string[]);
          }
          if (Array.isArray(capa["Stakeholders Review"])) {
            drawSectionTitle("Stakeholders Review");
            const stakeholders = capa["Stakeholders Review"] as Stakeholder[];
            stakeholders.forEach((st) => {
              drawKeyValue("Added On", st["Added On"] || "");
              drawKeyValue("Added By", st["Added By"] || "");
              drawKeyValue("PID", st["PID"] || "");
              drawKeyValue("Comments", st["Comments"] || "");
            });
          }
        }

        cursorY += 18;
      }

      const filename = `OOS_Report_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const visible = reportItem ? (
    <div className="h-full w-full overflow-y-auto">
      {(() => {
        switch (slide) {
          case "Slide1":
            return <Slide1Template reportItem={reportItem} />;
          case "Slide2":
            return <Slide2Template reportItem={reportItem} />;
          case "Slide3":
            return <Slide3Template reportItem={reportItem} />;
          case "Slide4":
            return <Slide4Template reportItem={reportItem} />;
          case "Slide5":
            return <Slide5Template reportItem={reportItem} showQualityButton={!!showQualityButton} onDownload={generatePDF} />;
          default:
            return <div>Unknown slide template: {slide}</div>;
        }
      })()}
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center text-gray-400 overflow-hidden">No report to show.</div>
  );

  return (
    <div className="h-full w-full relative">
      {visible}
      {isGenerating && <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">Generating PDF...</div>}
    </div>
  );
};

export default ReportInterface;