"use client";

import { useState } from "react";
import Card from "@Coronation-ArchTouch/cor-ui";
import { Typography, Button } from "@Coronation-ArchTouch/cor-ui";

interface DetailRowProps {
  label: string;
  value: string;
  field: string;
}
const PaymentInfo = () => {
  const [copiedField, setCopiedField] = useState(null);

  const bankDetails = {
    accountName: "Coronation Group",
    accountNumber: "1234567890",
    bankName: "CMB",
    // routingNumber: "987654321",
    // swift: "CTBKUS33",
  };

  const copyToClipboard = (text: string, field: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const DetailRow = ({ label, value, field }: DetailRowProps) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
      <Typography variant="p2-medium" className="text-gray-600">
        {label}
      </Typography>
      <div className="flex items-center space-x-2">
        <Typography variant="p2-semibold" className="text-gray-900">
          {value}
        </Typography>
        <Button
          variant="ghost"
          onClick={() => copyToClipboard(value, field)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
          title="Copy to clipboard"
        >
          {copiedField === field ? (
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography
            variant="h3-semibold"
            as="h2"
            className="text-2xl md:text-3xl text-gray-900 mb-2"
          >
            Thank You for Your Generosity!
          </Typography>
          <Typography variant="p1-regular" className="text-gray-600">
            Please complete your donation using the bank details below
          </Typography>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-primary-900">
              <p className="font-semibold mb-1">Important Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-primary-800">
                <li>
                  Use the account details below to complete your bank transfer
                </li>
                <li>Include your email address in the transfer reference</li>
                <li>
                  You'll receive a confirmation email once we verify your
                  donation
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Typography
            variant="h4-semibold"
            as="h3"
            className="text-lg text-gray-900 mb-3"
          >
            Bank Transfer Details
          </Typography>
          <DetailRow
            label="Account Name"
            value={bankDetails.accountName}
            field="accountName"
          />
          <DetailRow
            label="Account Number"
            value={bankDetails.accountNumber}
            field="accountNumber"
          />
          <DetailRow
            label="Bank Name"
            value={bankDetails.bankName}
            field="bankName"
          />
          {/* <DetailRow
            label="Routing Number"
            value={bankDetails.routingNumber}
            field="routingNumber"
          />
          <DetailRow
            label="SWIFT Code"
            value={bankDetails.swift}
            field="swift"
          /> */}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <Typography
            variant="h5-semibold"
            as="h4"
            className="text-gray-900 mb-2"
          >
            What Happens Next?
          </Typography>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Complete the bank transfer using the details above</li>
            <li>We'll verify your donation within 1-2 business days</li>
            <li>You'll receive a thank you email with tax receipt</li>
            <li>Your contribution will be put to work immediately</li>
          </ol>
        </div>
      </div>

      <Typography
        variant="p3-regular"
        className="text-center text-gray-500 text-sm mt-6"
      >
        Questions? Contact us at{" "}
        <a
          href="mailto:contact@hopefund.org"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          contact@hopefund.org
        </a>
      </Typography>
    </div>
  );
};

export default PaymentInfo;
