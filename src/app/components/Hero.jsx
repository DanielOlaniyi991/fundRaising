import Link from "next/link";
import Carousel from "./Carousel";
import { Typography, Button, Colors } from "@Coronation-ArchTouch/cor-ui";

const Hero = () => {
  // Placeholder images - replace with actual charity images
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop",
      alt: "Children receiving education support",
    },
    {
      src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1920&h=1080&fit=crop",
      alt: "Community gathering",
    },
    {
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&h=1080&fit=crop",
      alt: "Helping hands in action",
    },
  ];

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Carousel images={heroImages} interval={5000} autoPlay={true} />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="container-custom">
          <div className="max-w-3xl animate-slide-up">
            <Typography
              variant="h1-semibold"
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight !bg-transparent"
            >
              Transform Lives Through <br />
              <Typography
                variant="h1-semibold"
                as="span"
                color={Colors.primary.brand.corporate[300]}
                className="!bg-transparent"
              >
                Your Generosity
              </Typography>
            </Typography>
            <Typography
              variant="p1-regular"
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
            >
              Join us in making a lasting impact on communities in need. Every
              contribution brings hope, education, and opportunity to those who
              need it most.
            </Typography>
            <div className="!flex !flex-col sm:!flex-row gap-4">
              <Link href="/donate">
                <Button
                  variant="bold"
                  theme="corporate"
                  color="brand"
                  size="large"
                  className="text-lg px-8 py-4 text-center"
                >
                  Support the Cause
                </Button>
              </Link>
              <a href="#about">
                <Button
                  variant="stroke"
                  color="neutral"
                  size="large"
                  className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 rounded-none"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
