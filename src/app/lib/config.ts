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
          "human": null,
          "bot": [
            "Basis your selection of the open OOS.  Please find the data gathered on the OOS incident.Kindly confirm on the preliminary data generated. ",
            "Sure, I would like to go ahead with the investigation",
            "Preliminary investigation needs to consider additional data points.",
            "Go back to the main dashboard"
          ],
          "checkbox": true,
          "report": true,
          "reportitem": {
            "Title": "Out of Specification",
            "Division/Project": "GMP/Out Of Specification",
            "PRN": "79374",
            "Current State": "Ongoing",
            "General Information": {
              "Record Number": "ABC/GMP/OOS/2023-0044",
              "Initiating Department": "Mr A",
              "Initial TCD": "25-Feb-2023",
              "Actual Closure Date": "",
              "OOS Department": "Quality Control",
              "Operating Unit": "Unit X",
              "Location": "Hyderabad",
              "Initiation Date": "23-Feb-2023 08:36",
              "Revised TCD": "",
              "Date of Occurrence": "22-Feb-2023 23:23",
              "Short Description": "Out of specification result observed in poloxamer content for ZTS-00508841 mAb of Batch No:LF22000602 at the stage of Kolliphor P188 bio 3% stock in process(IPC 42).",
              "Brief Description": "On 22 Feb 2023, poloxamer content test was performed for in process samples of ZTS-00508841 Batch no:LF22000602, stage Kolliphor P188 bio 3% stock by the analyst (Emp ID:10028810).",
              "Product/Material Name": "Product X (ABC-00508841)",
              "Sample Type": "Other",
              "Batch Type": "Commercial Batch",
              "Pack Details (if any)": "NA",
              "Test Name": "Poloxamer content",
              "Test Method Reference": "STP-GMP-QCB-0081",
              "Test Method Ref. Version No.": "5.0"
            }
          }
        }
      ],
      [
        {
          "human": "Sure, I would like to go ahead with the investigation",
          "bot": [
            "Thank you for your confirmation on the preliminary data. Kindly also confirm if the immediate steps were taken. If not state the reasons for the same or mention any additional steps that were taken.",
            "The sample and instrument used for analysis were labelled as OOS investigation underway.",
            "The cross-functional teams were notified and the new samples were provided for retesting."
          ],
          "checkbox": true,
          "report": false
        }
      ],
      [
        {
          "human": "Yes, we have taken the above mentioned actions. In addition to this, to continue the manufacturing process, a notification was sent to the manufacturing department to provide the new samples for retesting.",
          "bot": [
            "Thank you for the confirmation. Please type or click on proceed for probable root cause identification. "
          ],
          "checkbox": false,
          "report": false          
        }
      ]
    ],
    "Slide2": [
      [
        {
          "human": "Proceed with finding the probable root cause",
          "bot": [
            "Based on my search on previous similar OOS incidents observed in poloxamer content at the stage of 'Kolliphor P188 bio 3% stock' in process, Below are the product history details related to the current open OOS incident. The related root causes are highlighted under product history section.",
            "Kindly confirm post reviewing the product history",
            "Any additional details to be referred."
          ],
          "checkbox": true,
          "report": true,
          "reportitem": {
            "Work Bench Reviewers": [
              {
                "Title": "Product History",
                "Body": "Basis the verification of Track wise history from 22 Feb 2022 to 23 Feb 2023 for the OOS incidents in poloxamer content at the stage of 'Kolliphor P188 bio 3% stock' in process, the details are as follows",
                "PR#60446": {
                    "Root Cause": "Dilution related error while working on lower concentration/ low sample volume.",
                    "Contribution Factor": "Though analyst has performed the test as per STP, analyst Ms Z (Employee ID: 130078) misses her opportunity to choose appropriate pipette while working on low sample volumes",
                    "Status": "OOS closed on 26 May 2022",
                    "CAPA": "75038"      
                },
                "PR#74512": {
                  "Root Cause": "Detector performance was not found repeatable as CAD technique is nebulization technique which involves variable parameters",
                  "Contribution Factor": "Preventive maintenance with kit for applicable Parts replacement of CAD detector being performed annually once or servicing for any breakdown.",
                  "Status": "OOS closed on 04 Jan 2023",
                  "CAPA": "NA"
                }
              }
            ]
          }
        }
      ],
      [
        {
          "human": "I have reviewed the details. Kindly proceed to the next step",
          "bot": [
            "Below are the phases of investigation, to arrive at the root cause: \n 1. A Phase Ia investigation involving the screening of preliminary data to identify the potential errors. \n 2. A Phase Ib investigation involving the review and validation of the analytical tests.",
            "Kindly confirm, to start generating the action items, for  Phase Ia."
          ],
          "checkbox": true,
          "report": false
        }
      ]
    ],
    "Slide3": [
      [
        {
          "human": "Sure, lets start with the phase Ia investigation. Please, start drafting the preliminary report basis the investigation.",
          "bot": [
            "For the phase Ia investigation, the workbench data need to be screened to identify the potential root cause. \nPlease provide below details which would help me in generating the Phase I report-Workbench evaluation: \n 1. Whether there any evidence that the standards, reagents used have degraded?",
            "Yes",
            "No"
          ],
          "checkbox": true,
          "report": false
        }
      ],
      [
        {
          "human": "No, the standards and reagents used were not degraded. Kindly, also mention that the vial and caps were tightly sealed and had no cracks/openings ",
          "bot": ["Kindly confirm the output generated for the workbench evaluation. Please mention, if any data point needs further evaluation."],
          "checkbox" : false,
          "report": true,
          "reportitem": {
            "Workbench Evaluation": {
              "body": "The outcomes from workbench analysis are given below",
              "Analyst": "The analyst qualification report was verified and found appropriate",
              "Specification and STP:": "No discrepancy were observed with respect to procedure details mentioned ",
              "Chemical and reagents:": "Chemicals were within the expiry date. The caps and vials were sealed properly",
              "Power outage": "Basis the logbook of the instrument no power outage was observed.",
              "Calculation": "Verified the calculations and the details of the values entered in the observation data sheet and the validated excel sheet, there were no discrepancy observed with the calculations",
              "Instrument settings:" : "The instrument method was created by reviewer and the analyst has selected the desired method while executing the analysis.",
              "Sample with Batch No.:": "AA22000062 was recorded and no discrepancies were observed."
            }
        }
      }
      ],
      [
        {
          "human": "The output looks fine, kindly proceed with the evaluation of the outcome",
          "bot": [
            "Basis the preliminary data gathered and the inputs provided by the user on Phase Ia investigation, \"No obvious laboratory related error is identified for the Out of specification\".",
            "Kindly confirm to view the probable root causes",
            "Further analysis on additional parameters need to be performed for phase Ia investigation"
          ],
          "checkbox" : true,
          "report": true,
          "reportitem": {
            "Workbench Evaluation": {
              "body": "The outcomes from workbench analysis are given below",
              "Analyst": "The analyst qualification report was verified and found appropriate",
              "Specification and STP:": "No discrepancy were observed with respect to procedure details mentioned ",
              "Chemical and reagents:": "Chemicals were within the expiry date. The caps and vials were sealed properly",
              "Power outage": "Basis the logbook of the instrument no power outage was observed.",
              "Calculation": "Verified the calculations and the details of the values entered in the observation data sheet and the validated excel sheet, there were no discrepancy observed with the calculations",
              "Instrument settings:" : "The instrument method was created by reviewer and the analyst has selected the desired method while executing the analysis.",
              "Sample with Batch No.:": "AA22000062 was recorded and no discrepancies were observed."
            },
            "Evaluation Outcome":{
              "Obvious Error Identified": "No",
              "If Other Obvious Error": "NA",
              "Evaluation Outcome": "Based on Phase 1A investigation no obvious error was identified for the report OOS Further investigation shall be performed to identified the assignable cause"
            }
        }
        }
      ]
    ],
   
    "Slide4": [
      [
        {
          "human": "Please provide the probable root causes",
          "bot": [
            "On the basis of past OOS details, product history and preliminary data from phase Ia investigation, I suggest few probable root causes. Kindly confirm on the root cause.",
            "Any additional probable root cause to be included",
            "The probable root cause seems fine, kindly proceed with checklist generation"
          ],
          "checkbox": true,
          "report": true,
          "reportitem": {
            "Most Probable Root Cause Details": [
              "Incorrect blank correction where negative values were not corrected prior to sample reading ",
              "Possibility of dilution error during the sample preparation Differences in Calibration curve levels, sample dilution volumes, standard and sample",
              "Error in loading the injection volumes which could potentially result in variation sample ",
              "The intrusive nature of Poloxamer (which can be difficult to dissolve or requires temperature control) and needs to be completely dissolved in the solvent before injection, leading to a low/variable result sample.",
              "NA"
            ]
          }
        }
      ]
    ],
    "Slide5": [
      [
        {
          "human": "The probable root cause seems fine, Kindly proceed with the checklist generation",
          "bot": [
            "Please provide the necessary result details post performance of the tests"
          ],
          "checkbox": false,
          "report": true,
          "reportitem": {
            "Most Probable Root Cause Details": [
              "Incorrect blank correction where negative values were not corrected prior to sample reading ",
              "Possibility of dilution error during the sample preparation Differences in Calibration curve levels, sample dilution volumes, standard and sample",
              "Error in loading the injection volumes which could potentially result in variation sample ",
              "The intrusive nature of Poloxamer (which can be difficult to dissolve or requires temperature control) and needs to be completely dissolved in the solvent before injection, leading to a low/variable result sample.",
              "NA"
            ],
            "Root cause Checklists": [
              "Checklist 1",
              "Checklist 2",
              "Checklist 3",
              "Checklist 4"
          ]
          }
        }
      ],
      [
        {
          "human": "The retests are performed as per the checklist and below are the results \nRoot Cause 1: No appropriate root cause identified \nRoot Cause 2: Sample preparation and retest was performed by using the scaled up sample and was found to be within 29.4 ±1.5 g/L, meeting the specification limit. Please comment on the obtained results ",
          "bot": [
            "Kindly confirm on the conclusion of the final root cause:",
            "Further tests needs to be performed ",
            "The assigned root cause is confirmed and should be taken ahead for the CAPA generation. "
          ],
          "checkbox": true,
          "report": true,
          "reportitem": {
            "Final root cause": [
              "Basis the results obtained during the verification of the methodologies, concentration of sample is equal to defined sample preparation concentrations as per STP.",
              "The method was found to precise and equivalent and probable variation is in turn due to calibration curve characteristics involving complex preparations in terms of lower dilutions [(0.334 ml to 10 ml with Micropipette)] Which has an impact on the quantification of Poloxamer. "
            ],
          
          }
        }
      ],
      [
        {
          "human": "The assigned root cause is confirmed and should be taken ahead for the CAPA generation.",
          "bot": [
            "The corrective and preventive actions are mentioned in the report. Kindly confirm",
            "Additional points to be mentioned in the CAPA details",
            "Proceed to draft the OOS report"
          ],
          "checkbox": true,
          "report": true,
          "reportitem": {
            "Final root cause": [
              "Basis the results obtained during the verification of the methodologies, concentration of sample is equal to defined sample preparation concentrations as per STP.",
              "The method was found to precise and equivalent and probable variation is in turn due to calibration curve characteristics involving complex preparations in terms of lower dilutions [(0.334 ml to 10 ml with Micropipette)] Which has an impact on the quantification of Poloxamer. "
            ],
            "CAPA Generation": {
              "Corrective Actions": [
                "Training to be imparted to the analysts to be more vigilant while performing the dilutions.",
                "Version No: 5.0 is revised in line with the X and Y STP, to scale up dilution without changing the final concentration."
              ],
              "Preventive Actions": [
                "Version No: 5.0 has explicit instructions to perform the dilutions."
              ]
            }
          }
        }
      ]
    ]
  }
};
