import Link from "next/link";
import { Typography, Button, Colors } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-trust-600 relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div> */}

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Typography
            variant="h2-semibold"
            as="h2"
            className=" !text-gray-900 text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Your Gift Can Change Everything
          </Typography>
          <Typography
            variant="p1-regular"
            className="text-lg md:text-xl !text-gray-900 mb-10 leading-relaxed"
          >
            Every donation, no matter the size, creates ripples of positive
            change. Join thousands of compassionate donors who are making a real
            difference in the world.
          </Typography>

          <div className="!flex !flex-col sm:!flex-row gap-6 !justify-center !items-center !mb-8">
            <div className="text-center">
              <Typography
                variant="display-2-bold"
                className="text-4xl md:text-5xl text-white mb-2 !text-gray-900"
              >
                $50
              </Typography>
              <Typography variant="p2-regular" className="text-gray-900">
                Feeds a family for a week
              </Typography>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/30" />
            <div className="text-center">
              <Typography
                variant="display-2-bold"
                className="text-4xl md:text-5xl mb-2 text-gray-900"
              >
                $100
              </Typography>
              <Typography variant="p2-regular" className="text-gray-900">
                Provides school supplies for 10 children
              </Typography>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/30" />
            <div className="text-center">
              <Typography
                variant="display-2-bold"
                className="text-4xl md:text-5xl text-gray-900 mb-2"
              >
                $500
              </Typography>
              <Typography variant="p2-regular" className="text-gray-900">
                Builds a clean water well
              </Typography>
            </div>
          </div>

          <Link href="/donate">
            <Button
              wide={true}
              variant="bold"
              theme="corporate"
              color="brand"
              size="large"
            >
              Donate Now
              {/* <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg> */}
            </Button>
          </Link>

          <Typography variant="p1-regular" className="mt-6 pb-6 text-gray-900">
            100% of your donation goes directly to those in need
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
