import Link from "next/link";
import { Colors, Logo, Typography } from "@Coronation-ArchTouch/cor-ui";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      Icon: FaFacebook,
      href: "https://www.facebook.com/coronationnggroup?mibextid=ZbWKwL",
    },
    {
      Icon: FaLinkedin,
      href: "http://linkedin.com/company/coronation-trustees",
    },
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/coronationgroup/profilecard/?igsh=Y3FiYW5tcGh0OW54",
    },
    {
      Icon: FaTwitter,
      href: "https://x.com/coronation_ng?t=s8v4zjmlCv-B1xrlvBLAoQ&s=09",
    },
  ];

  return (
    <footer className="bg-black text-white px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center justify-start mb-6">
            <Logo dark type="coronation" size={220} />
          </div>
          <Typography variant="p1-regular" className="text-gray-400 max-w-2xl">
            Coronation is a premium African financial services provider ranging
            from retail to institutional solutions
          </Typography>
        </div>

        {/* 3-Column Grid for Main Services, Self Services, and Follow Us */}
        <div className="grid !grid-cols-1 md:!grid-cols-3 gap-10 lg:gap-16">
          {/* Main Services */}
          <div>
            <Typography
              variant="h4-semibold"
              as="h3"
              className="text-xl mb-6 text-white"
            >
              MAIN SERVICES
            </Typography>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Asset Management
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Private Banking & Wealth Management
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Corporate & Investment Banking
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  All subsidiaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Self Services */}
          <div>
            <Typography
              variant="h4-semibold"
              as="h3"
              className="text-xl mb-6 text-white"
            >
              SELF SERVICE
            </Typography>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Submit Claim
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Account Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <Typography
              variant="h4-semibold"
              as="h3"
              className="text-xl mb-6 text-white"
            >
              Follow Us
            </Typography>
            <div className="flex flex-wrap gap-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  // aria-label={`Visit us on ${link.Icon.replace("Fa", "")}`}
                >
                  <link.Icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Typography variant="p2-regular" className="text-gray-400">
            &copy; {currentYear} Coronation. All rights reserved. Making a
            difference, one donation at a time.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
