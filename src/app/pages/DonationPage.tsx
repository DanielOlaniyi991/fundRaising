import DonationForm from "../components/DonationForm";
import Card, { Colors } from "@Coronation-ArchTouch/cor-ui";
import { Typography } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

const DonationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex !items-center !justify-center font-bold">
                1
              </div>
              <Typography variant="p2-medium" className="ml-2 text-gray-900">
                Donation Details
              </Typography>
            </div>
            <div className="w-16 h-1 bg-gray-300" />
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                2
              </div>
              <Typography variant="p2-medium" className="ml-2 text-gray-500">
                Payment
              </Typography>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-white ">
            <div className="text-center mb-8">
              <Typography
                variant="h2-semibold"
                as="h1"
                className="text-3xl md:text-4xl text-gray-900 mb-3"
              >
                Make a <span className="text-gradient">Difference</span> Today
              </Typography>
              <Typography variant="p1-regular" className="text-gray-600">
                Your contribution directly supports our mission to create
                positive change in communities worldwide.
              </Typography>
            </div>

            <DonationForm />
          </div>

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                {/* <svg
                  className="w-5 h-5 text-green-600"
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
                  variant="outline"
                  icon="shield-check"
                  color={Colors.primary.success[500]}
                />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <svg
                  className="w-5 h-5 text-green-600"
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
                </svg> */}
                <Icon
                  variant="outline"
                  icon="check-circle"
                  color={Colors.primary.success[500]}
                />
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg> */}
                <Icon
                  variant="outline"
                  icon="lock"
                  color={Colors.primary.success[500]}
                />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
