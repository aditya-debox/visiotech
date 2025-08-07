"use client";

import Image from "next/image";
import Link from "next/link";
import FooterLogo from "../assets/visiotech-crop.png";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

import React, { useEffect, useState } from "react";
import client from "@/utils/graphqlClient";
import { gql } from "graphql-request";

interface ServiceDetails {
  serviceTitle: string;
  slug: string;
}

const Footer = () => {
  const [service, setService] = useState<ServiceDetails[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const query = gql`
        query Servicedetial {
          serviceDetails {
            serviceTitle
            slug
          }
        }
      `;

      try {
        const response = await client.request<{
          serviceDetails: ServiceDetails[];
        }>(query);
        if (response.serviceDetails) {
          setService(response.serviceDetails);
        }
        console.log(response.serviceDetails);
      } catch (error) {
        console.error("GraphQL Error:", error);
      }
    };

    fetch();
  }, []);

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Four Columns */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Logo */}
            <div className="space-y-4">
              <div className="mb-6">
                <Image
                  src={FooterLogo}
                  alt="Visiotech Logo"
                  width={150}
                  height={60}
                  className="h-auto w-auto max-w-[130px]"
                />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {`Atlanta's Trusted Commercial Security & Surveillance Experts`}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-3">
                <Link
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
                  href="/service"
                >
                  Services
                </Link>
                <Link
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
                  href="/brand"
                >
                  Brands Partnered
                </Link>
                <Link
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
                  href="/aboutus"
                >
                  About Us
                </Link>
              </nav>
            </div>

            {/* Column 3: Contact Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Contact Us
              </h3>
              <div className="space-y-4">
                <Link
                  href="tel:+15551234567"
                  className="flex items-start hover:opacity-80 transition-opacity duration-200"
                >
                  <FaPhone className="h-4 w-4 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Call us
                    </p>
                    <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </Link>

                <Link
                  href="mailto:info@visiotech.com"
                  className="flex items-start hover:opacity-80 transition-opacity duration-200"
                >
                  <FaEnvelope className="h-4 w-4 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Email us
                    </p>
                    <p className="text-sm text-slate-600">info@visiotech.com</p>
                  </div>
                </Link>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-4 w-4 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Visit us
                    </p>
                    <p className="text-sm text-slate-600">
                      123 Tech Street,
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Social Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Follow Us
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  Stay connected with us on social media for the latest updates
                  and news.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
                    aria-label="Visiotech on LinkedIn"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn className="h-4 w-4 fill-slate-600 group-hover:fill-slate-900" />
                  </Link>

                  <Link
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
                    aria-label="Visiotech on Instagram"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="h-4 w-4 fill-slate-600 group-hover:fill-slate-900" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {service.length > 0 && (
          <div className="border-t border-slate-200 py-6">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Our Services
              </h4>
              <div className="text-sm text-slate-600 leading-relaxed">
                {service.map((serviceItem, index) => (
                  <span key={serviceItem.slug}>
                    <Link
                      href={`/service/${serviceItem.slug}`}
                      className="hover:text-slate-900 transition-colors duration-200"
                    >
                      {serviceItem.serviceTitle}
                    </Link>
                    {index < service.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Bottom */}
        <div className="border-t border-slate-200 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright and Powered by */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500">
              <p className="text-center sm:text-left">
                © 2024 Visiotech. All rights reserved.
              </p>
            </div>

            {/* Developed by Debox */}
            <div className="text-sm text-slate-500">
              <p className="text-center sm:text-right">
                Developed by{" "}
                <Link
                  href="https://debox.co.in?utm_source=site&utm_id=visiotech"
                  target="_blank"
                  className="font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200"
                >
                  Debox
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
