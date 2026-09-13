import { Router, type IRouter } from "express";
import { ListComplaintTypesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const COMPLAINT_TYPES = [
  {
    id: "unauthorized-transactions",
    label: "Unauthorised Transactions",
    description: "Money was taken from your account without your knowledge or permission.",
    examples: [
      "Fraudulent card transactions you did not make",
      "Scam-related transfers out of your account",
      "Direct debit you did not authorise",
    ],
  },
  {
    id: "fees-charges",
    label: "Fees & Charges",
    description: "You were charged fees that are wrong, excessive, or were not disclosed to you.",
    examples: [
      "Unexpected account-keeping or maintenance fees",
      "Excessive dishonour or overdraft fees",
      "Charges that were not clearly disclosed when you signed up",
    ],
  },
  {
    id: "loan-mortgage",
    label: "Loan or Mortgage Issues",
    description: "Problems with how your loan or mortgage has been administered.",
    examples: [
      "Interest rate not correctly applied",
      "Incorrect repayment calculations",
      "Hardship variation request refused or ignored",
      "Mortgage discharge delays",
    ],
  },
  {
    id: "credit-card",
    label: "Credit Card Disputes",
    description: "Disputes about charges, limits, interest, or fraud on your credit card.",
    examples: [
      "Chargeback request refused",
      "Incorrect interest or fees applied",
      "Credit limit change without notice",
      "Fraudulent purchases on your card",
    ],
  },
  {
    id: "account-closure",
    label: "Account Closure",
    description: "Your bank closed or froze your account without adequate notice or reason.",
    examples: [
      "Account closed without explanation",
      "Access to funds blocked unexpectedly",
      "Notice period not provided before closure",
    ],
  },
  {
    id: "hardship",
    label: "Financial Hardship",
    description: "Your bank did not adequately consider or respond to your hardship application.",
    examples: [
      "Hardship request ignored or rejected without reason",
      "Not offered appropriate hardship arrangements",
      "Debt recovery action taken during a hardship review",
    ],
  },
  {
    id: "insurance",
    label: "Insurance (Bank-sold)",
    description: "Issues with insurance products sold by or through your bank.",
    examples: [
      "Claim refused without adequate reason",
      "Policy not explained properly at point of sale",
      "Add-on insurance you did not want was added to your account",
    ],
  },
  {
    id: "privacy-data",
    label: "Privacy & Data Issues",
    description: "Your personal or financial information was mishandled.",
    examples: [
      "Your data was shared without consent",
      "You were not informed about how your data is used",
      "Incorrect credit reporting affecting your credit file",
    ],
  },
  {
    id: "service-quality",
    label: "Poor Service or Communication",
    description: "The bank's service was unacceptable or they failed to communicate clearly.",
    examples: [
      "Complaints ignored or not responded to in time",
      "Conflicting information provided by staff",
      "Unreasonable delays processing your request",
    ],
  },
  {
    id: "superannuation",
    label: "Superannuation",
    description: "Issues relating to your superannuation fund if it is with an AFCA member.",
    examples: [
      "Incorrect super contributions",
      "Delay in releasing super",
      "Insurance claim within super refused",
    ],
  },
];

router.get("/complaint-types", (_req, res): void => {
  const data = ListComplaintTypesResponse.parse(COMPLAINT_TYPES);
  res.json(data);
});

export default router;
