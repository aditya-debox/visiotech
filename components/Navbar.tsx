"use client";

import logo from "@/assets/visiotech-crop.png";
import ModalStore from "@/store/modal";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

interface INavProps {
  email?: string;
  phone?: string;
}

const Navbar: React.FC<INavProps> = ({ email, phone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/service",
    },
    {
      name: "Brands Partnered",
      link: "/brand",
    },
    {
      name: "About us",
      link: "/aboutus",
    },
  ];

  const [isAtTop, setIsAtTop] = useState(true);
  const { setTriggerModal } = ModalStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const target = observerTargetRef.current;
      if (target) {
        const isPast120vh = window.scrollY > window.innerHeight * 0.45;
        setIsButtonVisible(isPast120vh);
      }
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsButtonVisible(true);
    }

    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  // Popup animation variants
  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Hamburger animation variants
  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full px-2 font-secondary 
      h-20 flex items-center border-b transition-all duration-300 bg-white`}
        style={{ zIndex: 40 }}
      >
        <div className="flex justify-between items-center px-6 lg:px-12 w-full max-w-7xl mx-auto">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center h-full">
            <Link
              href={"/"}
              prefetch={false}
              passHref
              className="relative w-[95px] sm:w-[120px] md:w-[140px] h-12 mr-10 flex items-center flex-shrink-0"
            >
              <Image
                src={logo || ""}
                alt="Visiotech Logo"
                fill
                sizes=""
                className="object-contain"
              />
            </Link>

            <div className="hidden md:block h-full">
              <ul className="flex items-center h-full text-sm text-gray-500 gap-4 font-extrabold">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center h-full font-medium"
                  >
                    <Link href={item.link}>
                      <span className="block px-2 py-1 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right section - Get Started button and Mobile menu */}
          <div className="flex items-center gap-4">
            <div
              className="bg-blue-600 text-white font-secondary flex items-center justify-center rounded-full px-4 text-sm active:bg-blue-800 active:text-blue-100 cursor-pointer"
              onClick={() => setTriggerModal(true)}
            >
              <button className="py-1.5 leading-none md:leading-relaxed cursor-pointer">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden cursor-pointer relative p-2"
              style={{ zIndex: 500 }}
              onClick={toggleMenu}
              variants={hamburgerVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <IoMdClose size={24} color="black" />
              ) : (
                <HiMenu size={24} color="black" />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-slate-300/50 transition-opacity duration-150 lg:hidden"
              style={{ zIndex: 40 }}
              onClick={toggleMenu}
            />

            {/* Popup Box */}
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-18 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-white rounded-2xl shadow-2xl lg:hidden"
              style={{ zIndex: 45 }}
            >
              {/* Popup content */}
              <div className="px-8 pt-6">
                {/* Navigation items */}
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={
                        item.name === "Our Specialities"
                          ? "/#our-specialities-mobile"
                          : item.link
                      }
                      target={item.name === "Bar Menu" ? "_blank" : "_self"}
                      className="block w-full text-center border-b border-gray-200 py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 cursor-pointer last:border-0"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Get Started button */}
                <div className="mt-3 ml-1 flex w-full items-center justify-center">
                  {/* <button
                    className="bg-blue-600 text-white font-medium text-sm py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                  onClick={() => {
                    setTriggerModal(true);
                    toggleMenu();
                  }}
                >
                  Get Started
                  </button> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div ref={observerTargetRef} style={{ height: "1px" }} />
    </>
  );
};

export default Navbar;
