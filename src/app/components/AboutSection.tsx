import { Card, Typography, Colors } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

const AboutSection = () => {
  const achievements = [
    {
      icon: (
        <Icon
          icon="users-three"
          variant="fill"
          color={Colors.primary.error[300]}
        />
      ),
      stat: "50,000+",
      label: "Lives Impacted",
    },
    {
      icon: (
        <Icon
          icon="currency-dollar"
          variant="fill"
          color={Colors.primary.error[300]}
        />
      ),
      stat: "$2M+",
      label: "Funds Raised",
    },
    {
      icon: (
        <Icon icon="globe" variant="fill" color={Colors.primary.error[300]} />
      ),
      stat: "25+",
      label: "Countries Reached",
    },
    {
      icon: (
        <Icon
          icon="check-circle"
          variant="fill"
          color={Colors.primary.error[300]}
        />
      ),
      stat: "100+",
      label: "Projects Completed",
    },
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop",
      alt: "Community event 1",
    },
    {
      src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
      alt: "Community event 2",
    },
    {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
      alt: "Community event 3",
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      alt: "Community event 4",
    },
    {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
      alt: "Community event 5",
    },
    {
      src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
      alt: "Community event 6",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom py-20">
        {/* Mission Statement */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Typography
            variant="h2-semibold"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6"
          >
            Our <span className="text-gradient">Mission</span>
          </Typography>
          <Typography
            variant="p1-regular"
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            We believe every person deserves access to education, healthcare,
            and opportunities for growth. Since our founding, we've been
            committed to creating sustainable change through community-driven
            initiatives and strategic partnerships.
          </Typography>
        </div>

        {/* Achievements */}
        <div className="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 gap-8 mb-16 px-4">
          {achievements.map((achievement, index) => (
            <div key={index}>
              <Card
                buttonProps={{
                  color: "brand",
                  // label: "File a Claim",
                  // rel: "noopener noreferrer",
                  size: "medium",
                  target: "_blank",
                  // url: "https://coronation.com",
                  variant: "text",
                }}
                description={achievement.label}
                icon={achievement.icon}
                theme="corporate"
                title={achievement.stat}
                variant="feature"
              />
            </div>
          ))}

          {/* <Card
            description="Designed for your convenience to enable you initiate claim request and monitor the status of your existing claim request."
            icon="file-text"
            theme="individual"
            title="File a Claim"
            variant="feature"
          /> */}
        </div>

        {/* Image Gallery */}
        <div className="px-4 py-2">
          <Typography
            variant="h3-semibold"
            as="h3"
            className="text-2xl md:text-3xl text-gray-900 mb-8 text-center"
          >
            Past Events & Impact
          </Typography>
          <div className="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-video group cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white font-semibold">
                    {image.alt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
