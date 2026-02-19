"use client";
import { Typography, Colors } from "@Coronation-ArchTouch/cor-ui";
import Accordion from "./organisms/Accordion";

const LearnMoreSection = () => {
  const infoItems = [
    {
      title: "2026 Theme: Building Sustainable Futures",
      content:
        "This year, we're focusing on sustainable development initiatives that create long-term positive impact. Our programs emphasize education, renewable energy, and economic empowerment to help communities thrive independently.",
    },
    {
      title: "Where Your Funds Go",
      content:
        "45% goes to education programs (schools, scholarships, learning materials), 30% to healthcare initiatives (medical supplies, health clinics, clean water), 20% to economic development (microloans, job training, agriculture), and 5% to operational costs (all transparently reported).",
    },
    {
      title: "Our Impact Goals for 2026",
      content:
        "Build 50 new schools in underserved communities, provide clean water access to 100,000 people, train 5,000 individuals in sustainable agriculture and renewable energy, and establish 20 healthcare centers in remote areas.",
    },
    {
      title: "Transparency & Accountability",
      content:
        "We publish quarterly impact reports, conduct annual third-party audits, provide photo and video updates from project sites, and maintain an open-door policy for donor inquiries and site visits.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="learn-more">
      <div className="container-custom">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Typography
            variant="h2-semibold"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6"
          >
            Learn More About Our Work
          </Typography>
          <Typography
            variant="p1-regular"
            as="p"
            className="text-lg text-gray-600"
          >
            Discover how your contribution creates lasting change and supports
            our mission to build a better tomorrow.
          </Typography>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <Accordion
            items={infoItems.map((learn) => ({
              title: learn.title,
              content: learn.content,
            }))}
            variant="separate"
          />
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
