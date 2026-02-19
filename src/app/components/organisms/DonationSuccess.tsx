"use client";

import { Typography, Colors, Button } from "@Coronation-ArchTouch/cor-ui";
import { useRouter } from "next/navigation";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

const DonationSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          {/* <svg
            className="w-10 h-10 text-green-600"
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
          </svg> */}
          <Icon icon="check-circle" variant="fill" color="#FFF" />
        </div>
        <Typography
          variant="h2-semibold"
          className="text-3xl text-gray-900 mb-4"
        >
          Thank You!
        </Typography>
        <Typography variant="p1-regular" className="text-gray-600 mb-8">
          Your donation has been received successfully. You'll receive a
          confirmation email shortly.
        </Typography>
        <Button
          color="brand"
          theme="corporate"
          onClick={() => router.push("/")}
          label="Return to Home"
        />
      </div>
    </div>
  );
};

export default DonationSuccess;
