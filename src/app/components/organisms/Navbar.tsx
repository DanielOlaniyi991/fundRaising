"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo, Button, Typography, Colors } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 px-4 py-2">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <Logo type="coronation" size={220} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:!flex md:items-center md:space-x-8">
            <Link href="/" className="!no-underline">
              <Typography
                variant="p2-medium"
                color={Colors.primary.gray[1100]}
                // className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Home
              </Typography>
            </Link>
            <Link href="/#about">
              <Typography
                variant="p2-medium"
                color={Colors.primary.gray[1100]}
                // className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                About
              </Typography>
            </Link>
            <Link href="/#impact">
              <Typography
                variant="p2-medium"
                color={Colors.primary.gray[1100]}
                // className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Our Impact
              </Typography>
            </Link>
            <Link href="/donate">
              <Button
                // prefixIcon={
                //   <Icon icon="address-book" variant="fill" color="#FFF" />
                // }
                variant="bold"
                theme="corporate"
                color="brand"
                size="medium"
              >
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - hidden on desktop */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#impact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Our Impact
              </Link>
              <Link href="/donate" onClick={() => setIsOpen(false)}>
                <Button
                  variant="bold"
                  theme="corporate"
                  color="brand"
                  size="medium"
                  block
                >
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
