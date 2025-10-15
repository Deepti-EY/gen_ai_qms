import type { ResponsesConfig } from "./types";

export const BACKEND_URL = "https://genome-emr-agent-be.azurewebsites.net";
export const MAIN_APP_URL =
  "https://eygenome-genaistudio-app.azurewebsites.net";
export const CURRENT_SUB_DOMAIN = "gen-ai-qms";

export const RESPONSES: ResponsesConfig = {
  "Slides": {
    "Slide1": [
      [
        {
          "human": "I want to create a OOS report basis the results observed in poloxamer content for ZTS-00508841",
          "bot": "Sure, Please give me a short description of the test or provide me a Sequence ID/ LIMS ID",
          "report": false
        }
      ],
      [
        {
          "human": "On 15 Feb 2023, poloxamer content test was performed for In process Samples of ZTS-00508841 Batch no: LF22000600, stage Kolliphor P188 bio 3% stock by the analyst Mr. A (Emp ID: 10028810). Injection-01: 32.73 mg/mL Injection-02: 32.47 mg/mL Injection-03: 32.38 mg/mL Average three triplicate injection results: 32.5 mg/mL Out of specification result observed in poloxamer content or The LIMS ID or PR ID is 79374",
          "bot": "I would need few additional information, Please provide reasons for delay in the logging of OOS",
          "report": false
        }
      ],
      [
        {
          "human": "Logging of the OOS was delayed due to reviewer bandwidth constraint",
          "bot": "Thank you, basis the information provided, some immediate action needs to be taken: The sample and instrument used for analysis are to be labelled as OOS investigation underway. The Client and cross-functional team have been notified. In order to continue the manufacturing process notification has been sent to the manufacturing department to provide the lot -2 sample for testing. Would you like to proceed with notifying the QA department as well?",
          "report": true,
          "reportitem": {
            "Title": "Out of Specification",
            "Division/Project": "GMP/Out Of Specification",
            "PRN": "79374",
            "Current State": "Ongoing",
            "General Information": {
              "Record Number": "123",
              "Initiating Department": "ABCD",
              "OOS Department": "Chemical",
              "Operating Unit": "Name of the unit",
              "Location": "Name of the city",
              "Initiation Date": "23-Feb-2023 08:36",
              "Revised TCD": "25-Mar-2023",
              "Initial TCD": "23-Feb-2023",
              "Date of Occurrence": "22-Feb-2023 23:23",
              "Actual Closure Date": "",
              "Delay Justification": "Reviewer bandwidth constraints",
              "Short Description": "Out of specification result observed in poloxamer content for ZTS-00508841 mAb of Batch No:LF22000602 at the stage of Kolliphor P188 bio 3% stock in process(IPC 42).",
              "Brief Description": "On 22 Feb 2023, poloxamer content test was performed for in process samples of ZTS-00508841 Batch no:LF22000602, stage Kolliphor P188 bio 3% stock by the analyst (Emp ID:10028810).",
              "Product/Material Name": "BEDINENTEMABS (ZTS-00508841)",
              "Sample Type": "Other",
              "Batch Type": "Commercial Batch",
              "Pack Details (if any)": "NA",
              "Test Name": "Poloxamer content",
              "Test Method Reference": "STP-GMP-QCB-0081",
              "Test Method Ref. Version No.": "5.0"
            }
          }
        }
      ]
    ],
    "Slide2": [
      [
        {
          "human": "Yes",
          "bot": "Basis the preliminary data, the next check on error needs to be performed on Analyst > Analytical method. Kindly confirm the sequence",
          "report": false
        }
      ],
      [
        {
          "human": "The sequence seems fine, kindly proceed with generation of report",
          "bot": "Please provide below details which would help me in generating the Phase I report - Analyst evaluation: “Whether the analyst understood the test procedures of specifications?”",
          "report": false
        }
      ],
      [
        {
          "human": "Yes, analyst is qualified and understood the procedure mentioned in STP",
          "bot": "Basis the preliminary data gathered on analyst evaluation and basis the input provided — No error was identified for the observed OOS by the analyst.",
          "report": true,
          "reportitem": {
            "Analyst Evaluation": {
              "Training": "Sampling activity was performed by manufacturing site and submitted to QCB for in process analysis.",
              "Specification": "Analyst has followed correct specification SPEC-GMP-QCB-SFG-030001939-IPS-0002, version No: 2.0.",
              "Sampling": "The sample was appropriately labelled with Batch No. LF22000602 which has the stage '3% Kolliphor stock' and matches with the information in the TRF.",
              "Test Procedure": "Analyst is qualified and understood the procedure mentioned in STP (STP-GMP-QCB-0081, version No: 5.0).",
              "Observation/Error": "Based on Phase I investigation no error was identified for the observed OOS by the analyst."
            }
          }
        }
      ],
      [
        {
          "human": "Analyst has used the validated STP (STP-GMP-QCB-0081, version No: 5.0) for analysis",
          "bot": "Basis the preliminary data gathered on analyst evaluation and basis the input provided — No observation due to analytical method was identified. Would you like to proceed with verifying the system suitability and validation protocol as per the next phase checklist?",
          "report": true,
          "reportitem": {
            "Analyst Evaluation": {
              "Training": "Sampling activity was performed by manufacturing site and submitted to QCB for in process analysis.",
              "Specification": "Analyst has followed correct specification SPEC-GMP-QCB-SFG-030001939-IPS-0002, version No: 2.0.",
              "Sampling": "The sample was appropriately labelled with Batch No. LF22000602 which has the stage '3% Kolliphor stock' and matches with the information in the TRF.",
              "Test Procedure": "Analyst is qualified and understood the procedure mentioned in STP (STP-GMP-QCB-0081, version No: 5.0).",
              "Observation/Error": "Based on Phase I investigation no error was identified for the observed OOS by the analyst."
            },
            "Analytical Method Evaluation": {
              "Method of Analysis": "Analyst has used the STP (STP-GMP-QCB-0081, version No: 5.0) for analysis, which is in line with current STP.",
              "Analytical Method Validation": "Yes, Analytical method is validated.",
              "Specification Steps": "Analysis steps are clearly provided in the STP, and which are adequate to perform Poloxamer content analysis.",
              "OOS": "Yes, OOS result was reported within the variability.",
              "Observation/Error": "No observation due to analytical method was identified."
            }
          }
        }
      ]
    ],
    "Slide3": [
      [
        {
          "human": "Yes",
          "bot": "Basis the data provided, kindly confirm the responsible department hierarchy, to enable alert notifications and emails",
          "report": true,
          "reportitem": {
            "Work Bench Reviewers": [
              {
                "Name": "YYY",
                "Employee ID": "2",
                "Designation": "Associate Manager"
              }
            ]
          }
        }
      ],
      [
        {
          "human": "The hierarchical workflow looks fine, add one layer of Deputy manager to it and start sending the notifications and emails. Also, start preparing the preliminary report for phase I investigation basis the data provided.",
          "bot": "Please provide below details which would help me in generating the Phase I report-Workbench evaluation: “Whether there any evidence that the standards, reagents used have degraded?” “Whether the vial is having any crack on the Cap/Vial?”",
          "report": false
        }
      ],
      [
        {
          "human": "No, the standards and reagents used were not degraded and the vial did not have cracks",
          "bot": "Basis the preliminary data gathered on workbench evaluation and basis the input provided — 'No obvious laboratory related error is identified for the Out of specification'. Would you like to proceed with the next phase of investigation to verify the analytical method and analyst sequence?",
          "report": true,
          "reportitem": {
            "Work Bench Reviewers": [
              {
                "Name": "XXX",
                "Employee ID": "1",
                "Designation": "Deputy Manager"
              },
              {
                "Name": "YYY",
                "Employee ID": "2",
                "Designation": "Associate Manager"
              }
            ],
            "Title": "Phase I Investigation",
            "Work Bench Evaluation": "The analyst work bench was evaluated on 23-Feb-2023 by QCB reviewer Mr. YYY (Employee ID: 10023500) and Mr. XXX (Employee ID: 10031797) to find out any obvious error for the OOS.",
            "Outcomes": {
              "Analyst": "The analyst qualification report was verified and found appropriate",
              "Specification and STP": "The method of analysis is adequate and easily understood",
              "Chemicals and Reagents": "Chemicals were within the expiry date"
            },
            "Obvious Error Identified": "No",
            "If Other Obvious Error": "NA",
            "Evaluation Outcome": "Based on Phase Ia investigation no obvious error was identified for the reported OOS. Further investigation shall be performed to identify the assignable cause."
          }
        }
      ]
    ],
   
    "Slide4": [
      [
        {
          "human": "Yes",
          "bot": "Basis the Phase I investigation no assignable cause have been identified. I recommend a checklist to be followed to arrive at a probable cause. 1. Verify the initial system suitability as per STP 2. Validation of the Analytical method protocol for the given 2 STP’s",
          "report": true,
          "reportitem": {
            "Checklist for Laboratory OOS Investigation": [
              "Verify the initial system suitability as per STP",
              "Validation of the Analytical method protocol for the given STP’s",
              "To evaluate the impact of scaleup dilution, calibration curve, standard and sample injections volumes."
            ]
          }
        }
      ],
      [
        {
          "human": "The checklist seems fine. Suggest some probable errors that could have occurred basis previous similar OOS incidents. For example, “What are common lab errors for an OOS result where the HPLC analysis failed?” “Whether the analyst used correct sample?” “Whether the dilutions made are as per specification?”",
          "bot": "Based on my search on past incidents, probable root causes are highlighted in the report in the past incidents section. I will recommend to perform the action items basis the checklist provided in the report",
          "report": true,
          "reportitem": {
            "Checklist for Laboratory OOS Investigation": [
              "Verify the initial system suitability as per STP",
              "Validation of the Analytical method protocol for the given STP’s",
              "To evaluate the impact of scaleup dilution, calibration curve, standard and sample injections volumes."
            ],
            "Past Incidents": [
              "Analyst misses the opportunity to choose appropriate pipette while working on low sample volumes.",
              "Instrument malfunction - Detector performance was not found repeatable as CAD technique is nebulization technique which involves variable parameters."
            ]
          }
        }
      ],
      [
        {
          "human": "Analytical method evaluation study was performed between the 2 STP’s by using the same sample preparations and was found to be within 30.0 ±1.5 g/L",
          "bot": "This concluded that both the methods were found to be precise and equivalent. Based on the evaluation data, the probable root cause has been updated as a dilution related error",
          "report": true,
          "reportitem": {
            "Checklist for Laboratory OOS Investigation": [
              "Verify the initial system suitability as per STP",
              "Validation of the Analytical method protocol for the given STP’s",
              "To evaluate the impact of scaleup dilution, calibration curve, standard and sample injections volumes."
            ],
            "Past Incidents": [
              "Analyst misses the opportunity to choose appropriate pipette while working on low sample volumes.",
              "Instrument malfunction - Detector performance was not found repeatable as CAD technique is nebulization technique which involves variable parameters."
            ],
            "Most Probable Root Cause Details": "Review of retest analysis results and comprehensive study of both the STP results, the most probable cause for the initial OOS result is attributed to sample preparation error (Dilution related error) by the analyst for the subjected sample which led to initial reported OOS."
          }
        }
      ]
    ],
    "Slide5": [
      [
        {
          "human": "Please send the notification for approval to respective hierarchy",
          "bot": "The notification is sent to the respective HOD and QA reviewer for comments, final validation and e-signature",
          "report": true,
          "reportitem": {
            "Retesting HOD Review": {
              "Status": "Reviewed",
              "Comments": "BBB",
              "Retesting Review Completed On": "15-Mar-2023 12:22"
            },
            "Retesting QA Approval": {
              "Status": "Reviewed and Approved",
              "Comments": "CCC",
              "Retesting Approved On": "15-Mar-2023 12:25"
            }
          }
        }
      ],
      [
        {
          "human": "Please suggest the corrective and Preventive actions basis the investigation report and past history",
          "bot": "I would need few information based on the detailed investigation — “Whether any impact on the quality of the product was identified?”, “Whether any impact on other products manufactured/ analyzed in the same facility/lab, other batches, was identified?”",
          "report": true,
          "reportitem": {
            "Retesting HOD Review": {
              "Status": "Reviewed",
              "Comments": "BBB",
              "Retesting Review Completed On": "15-Mar-2023 12:22"
            },
            "Retesting QA Approval": {
              "Status": "Reviewed and Approved",
              "Comments": "CCC",
              "Retesting Approved On": "15-Mar-2023 12:25"
            },
            "CAPA Generation": {
              "Corrective Actions": [
                "Training to be imparted to the analysts to be more vigilant while performing the dilutions.",
                "Version No: 5.0 is revised in line with the X and Y STP, to scale up dilution without changing the final concentration."
              ],
              "Preventive Actions": [
                "Version No: 5.0 has explicit instructions to perform the dilutions."
              ],
              "Stakeholders Review": [
                {
                  "Added On": "14-Mar-2023 09:52 (GMT+5:30)",
                  "Added By": "Mr. A",
                  "Comments": "Investigation details were reviewed and found satisfactory.",
                  "PID": "0041476"
                },
                {
                  "Added On": "14-Mar-2023 16:32 (GMT+5:30)",
                  "Added By": "Mr. B",
                  "Comments": "Investigation details were reviewed and found satisfactory.",
                  "PID": "0041492"
                }
              ],
              "Investigation Approval": {
                "QA Approval Comments": "Re-test investigation details reviewed and found adequate. Based on the investigation details and outcome the appropriate CAPA has been initiated and approved for the reported OOS.",
                "Approved On": "15-Mar-2023 12:28"
              }
            }
          }
        }
      ],
      [
        {
          "human": "Please provide a draft of the OOS report",
          "bot": "Please find the link below to download/ view the PDF version of the OOS report",
          "report": true,
          "reportitem": {
            "Retesting HOD Review": {
              "Status": "Reviewed",
              "Comments": "BBB",
              "Retesting Review Completed On": "15-Mar-2023 12:22"
            },
            "Retesting QA Approval": {
              "Status": "Reviewed and Approved",
              "Comments": "CCC",
              "Retesting Approved On": "15-Mar-2023 12:25"
            },
            "CAPA Generation": {
              "Corrective Actions": [
                "Training to be imparted to the analysts to be more vigilant while performing the dilutions.",
                "Version No: 5.0 is revised in line with the X and Y STP, to scale up dilution without changing the final concentration."
              ],
              "Preventive Actions": [
                "Version No: 5.0 has explicit instructions to perform the dilutions."
              ],
              "Stakeholders Review": [
                {
                  "Added On": "14-Mar-2023 09:52 (GMT+5:30)",
                  "Added By": "Mr. A",
                  "Comments": "Investigation details were reviewed and found satisfactory.",
                  "PID": "0041476"
                },
                {
                  "Added On": "14-Mar-2023 16:32 (GMT+5:30)",
                  "Added By": "Mr. B",
                  "Comments": "Investigation details were reviewed and found satisfactory.",
                  "PID": "0041492"
                }
              ],
              "Investigation Approval": {
                "QA Approval Comments": "Re-test investigation details reviewed and found adequate. Based on the investigation details and outcome the appropriate CAPA has been initiated and approved for the reported OOS.",
                "Approved On": "15-Mar-2023 12:28"
              }
            },
            "Quality OOS Report": "Quality OOS Report"
          }
        }
      ]
    ]
  }
};
