// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import PaymentInfo from "../components/PaymentInfo";
// import { Typography, Colors } from "@Coronation-ArchTouch/cor-ui";
// import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

// interface DonationData {
//   fullName: string;
//   email: string;
//   amount: number;
// }

// const PaymentDetailsPage = () => {
//   const router = useRouter();
//   const [donationData, setDonationData] = useState<DonationData | null>(null);

//   useEffect(() => {
//     // Get donation data from session storage
//     const data = sessionStorage.getItem("donationData");
//     if (!data) {
//       // If no donation data, redirect back to donation page
//       router.replace("/donate");
//     } else {
//       const parsedData: DonationData = JSON.parse(data);
//       setDonationData(parsedData);
//     }
//   }, [router]);

//   if (!donationData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Typography variant="p1-regular" className="text-gray-600">
//           Loading...
//         </Typography>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container-custom">
//         {/* Progress Indicator */}
//         <div className="max-w-2xl mx-auto mb-8">
//           <div className="flex items-center justify-center space-x-4">
//             <div className="flex items-center">
//               <div className=" text-white flex items-center justify-center">
//                 {/* <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg> */}
//                 <Icon
//                   variant="fill"
//                   size="45px"
//                   icon="check-circle"
//                   color={Colors.primary.success[500]}
//                 />
//               </div>
//               <Typography variant="p2-medium" className="ml-2 text-gray-500">
//                 Donation Details
//               </Typography>
//             </div>
//             <div className="w-16 h-1 bg-primary-600" />
//             <div className="flex !items-center">
//               <div className="w-10 h-10 rounded-full bg-red-500 text-white flex !items-center !justify-center font-bold">
//                 2
//               </div>
//               <Typography variant="p2-medium" className="ml-2 text-gray-900">
//                 Payment
//               </Typography>
//             </div>
//           </div>
//         </div>

//         {/* Donation Summary */}
//         <div className="max-w-2xl mx-auto mb-6">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <Typography
//               variant="h4-semibold"
//               as="h3"
//               className="text-lg text-gray-900 mb-4"
//             >
//               Donation Summary
//             </Typography>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <Typography variant="p3-regular" className="text-gray-600">
//                   Donor:
//                 </Typography>
//                 <Typography variant="p3-medium" className="text-gray-900">
//                   {donationData.fullName}
//                 </Typography>
//               </div>
//               <div className="flex justify-between">
//                 <Typography variant="p3-regular" className="text-gray-600">
//                   Email:
//                 </Typography>
//                 <Typography variant="p3-medium" className="text-gray-900">
//                   {donationData.email}
//                 </Typography>
//               </div>
//               <div className="flex justify-between pt-2 border-t border-gray-200">
//                 <Typography variant="p3-regular" className="text-gray-600">
//                   Donation Amount:
//                 </Typography>
//                 <Typography
//                   variant="h3-semibold"
//                   className="text-2xl text-primary-600"
//                 >
//                   #{donationData.amount.toFixed(2)}
//                 </Typography>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Payment Info */}
//         <PaymentInfo />
//       </div>
//     </div>
//   );
// };

// export default PaymentDetailsPage;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, Colors, Button } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";
import Script from "next/script";

interface DonationData {
  fullName: string;
  email: string;
  amount: number;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaymentDetailsPage = () => {
  const router = useRouter();
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("donationData");
    if (!data) {
      router.replace("/donate");
    } else {
      const parsedData: DonationData = JSON.parse(data);
      setDonationData(parsedData);
    }
  }, [router]);
  useEffect(() => {
    if (window.PaystackPop) {
      setIsPaystackLoaded(true);
    }
  }, []);

  const payWithPaystack = () => {
    if (!donationData || !isPaystackLoaded) return;

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: donationData.email,
      amount: donationData.amount * 100, // Amount in kobo (for NGN)
      currency: "NGN",
      ref: "DON_" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donationData.fullName,
          },
        ],
      },
      callback: function (response: any) {
        // Payment was successful
        console.log("Payment successful:", response);

        // Verify the transaction on your backend
        verifyTransaction(response.reference);
      },
      onClose: function () {
        // User closed the payment modal
        console.log("Payment modal closed");
      },
    });

    handler.openIframe();
  };

  const verifyTransaction = async (reference: string) => {
    try {
      // Call your backend to verify the transaction
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Clear session storage
        sessionStorage.removeItem("donationData");

        // Redirect to success page
        router.push("/donation-success");
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert(
        "An error occurred while verifying payment. Please contact support.",
      );
    }
  };

  if (!donationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Typography variant="p1-regular" className="text-gray-600">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <>
      {/* Load Paystack Inline Script */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setIsPaystackLoaded(true)}
        onReady={() => setIsPaystackLoaded(true)}
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          {/* Progress Indicator */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Icon
                  variant="fill"
                  size="45px"
                  icon="check-circle"
                  color={Colors.primary.success[500]}
                />
                <Typography variant="p2-medium" className="ml-2 text-gray-500">
                  Donation Details
                </Typography>
              </div>
              <div className="w-16 h-1 bg-red-500" />
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <Typography variant="p2-medium" className="ml-2 text-gray-900">
                  Payment
                </Typography>
              </div>
            </div>
          </div>

          {/* Donation Summary */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
              <Typography
                variant="h4-semibold"
                as="h3"
                className="text-lg text-gray-900 mb-4"
              >
                Donation Summary
              </Typography>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Typography variant="p3-regular" className="text-gray-600">
                    Donor:
                  </Typography>
                  <Typography variant="p3-medium" className="text-gray-900">
                    {donationData.fullName}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p3-regular" className="text-gray-600">
                    Email:
                  </Typography>
                  <Typography variant="p3-medium" className="text-gray-900">
                    {donationData.email}
                  </Typography>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <Typography variant="p3-regular" className="text-gray-600">
                    Donation Amount:
                  </Typography>
                  <Typography
                    variant="h3-semibold"
                    className="text-2xl text-red-500"
                  >
                    ₦{donationData.amount.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Paystack Payment Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg> */}
                  <Icon
                    icon="credit-card"
                    variant="outline"
                    color={Colors.primary.error[300]}
                  />
                </div>
                <Typography
                  variant="h3-semibold"
                  as="h2"
                  className="text-2xl text-gray-900 mb-2"
                >
                  Complete Your Donation
                </Typography>
                <Typography variant="p1-regular" className="text-gray-600">
                  You're just one step away from making a difference
                </Typography>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 border border-gray-200  p-4 mb-6">
                <div className="flex items-start space-x-3">
                  {/* <svg
                    className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg> */}
                  <Icon
                    icon="shield-check"
                    variant="outline"
                    color={Colors.primary.error[300]}
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-1">
                      Secure Payment Powered by Paystack
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Pay securely with your card or bank account</li>
                      <li>
                        • Your payment information is encrypted and protected
                      </li>
                      <li>• Instant confirmation upon successful payment</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <Typography
                  variant="p2-semibold"
                  className="text-gray-700 mb-3 block"
                >
                  Accepted Payment Methods:
                </Typography>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-none">
                    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#252525" />
                      <text
                        x="24"
                        y="20"
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        VISA
                      </text>
                    </svg>
                    <span className="text-xs text-gray-600">Visa</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-none">
                    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                      <circle cx="18" cy="16" r="10" fill="#EB001B" />
                      <circle cx="30" cy="16" r="10" fill="#F79E1B" />
                    </svg>
                    <span className="text-xs text-gray-600">Mastercard</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-none">
                    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#00A3FF" />
                      <text
                        x="10"
                        y="20"
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        Verve
                      </text>
                    </svg>
                    <span className="text-xs text-gray-600">Verve</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-none">
                    <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                      <rect width="48" height="32" rx="4" fill="#000" />
                      <text
                        x="8"
                        y="20"
                        fill="white"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        BANK
                      </text>
                    </svg>
                    <span className="text-xs text-gray-600">Bank Transfer</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                theme="corporate"
                color="brand"
                // className="!w-full md:!px-[29px] !px-[16px] md:!py-[15.5px] !py-[12px] !rounded-[10px] !text-[16px] !leading-[150%] !font-[500]"
                onClick={payWithPaystack}
                label={`Pay ₦${donationData.amount.toLocaleString()} Now`}
                disabled={!isPaystackLoaded}
              />

              <Typography
                variant="p3-regular"
                className="text-center text-gray-500 text-xs mt-4"
              >
                By proceeding, you agree to our terms and conditions. Your
                donation is secure and encrypted.
              </Typography>
            </div>

            {/* Help Section */}
            <Typography
              variant="p3-regular"
              className="text-center text-gray-500 text-sm mt-6"
            >
              Need help? Contact us at{" "}
              <a
                href="mailto:support@coronation.ng"
                className="text-red-600 hover:text-red-500 font-medium"
              >
                support@coronation.ng
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsPage;
