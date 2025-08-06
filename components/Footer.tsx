import Image from "next/image";
import Link from "next/link";
import FooterLogo from "../assets/Choose-footer.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <div className="py-10">
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                className="inline-block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
                href="/service"
              >
                Services
              </Link>
              <Link
                className="inline-block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
                href="/brand"
              >
                Our partners
              </Link>
              <Link
                className="inline-block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
                href="/aboutus"
              >
                About us
              </Link>
            </div>
          </nav>
        </div>
        {/* Contact Information Section */}
        <div className="py-8 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-start md:place-items-center text-center md:text-left">
            <Link
              href="tel:+15551234567"
              className="flex items-center justify-center md:justify-start hover:opacity-80 transition-opacity duration-200"
            >
              <FaPhone className="h-5 w-5 text-slate-600 mr-3" />
              <div className="text-start">
                <p className="text-sm font-medium text-slate-900">Call us</p>
                <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
              </div>
            </Link>
            <Link
              href="mailto:info@visiotech.com"
              className="flex items-center justify-center md:justify-start hover:opacity-80 transition-opacity duration-200"
            >
              <FaEnvelope className="h-5 w-5 text-slate-600 mr-3" />
              <div className="text-start">
                <p className="text-sm font-medium text-slate-900">Email us</p>
                <p className="text-sm text-slate-600">info@visiotech.com</p>
              </div>
            </Link>
            <div className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="h-5 w-5 text-slate-600 mr-3 flex-shrink-0" />
              <div className="text-start">
                <p className="text-sm font-medium text-slate-900">Visit us</p>
                <p className="text-sm text-slate-600">
                  123 Tech Street, San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          {/* Social Media Icons */}
          <div className="flex gap-x-6 mb-6 sm:mb-0">
            <Link
              className="group"
              aria-label="Visiotech on LinkedIn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="h-5 w-5 fill-slate-500 group-hover:fill-slate-700 transition-colors duration-200" />
            </Link>

            <Link
              className="group"
              aria-label="Visiotech on Facebook"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="h-5 w-5 fill-slate-500 group-hover:fill-slate-700 transition-colors duration-200" />
            </Link>

            <Link
              className="group"
              aria-label="Visiotech on Instagram"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-5 w-5 fill-slate-500 group-hover:fill-slate-700 transition-colors duration-200" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500 sm:mt-0 text-center sm:text-left">
            Copyright © 2024 Visiotech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
