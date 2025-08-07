"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/visiotech-crop.png";
import ModalStore from "@/store/modal";

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
      name: "Brands",
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

  return (
    <>
      <div
        className={`fixed ${"top-0"}  left-0 w-full px-2 !z-40  font-secondary 
       h-20 grid place-items-center border-b shadow-md transition-all duration-300 ${"bg-white"}`}
      >
        <div className="flex justify-between items-center px-6 lg:px-12 w-full max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link
              href={"/"}
              prefetch={false}
              passHref
              className="relative w-[100px] h-[80px] mr-10 flex flex-shrink-0"
            >
              <Image
                src={logo || ""}
                alt="logo"
                fill
                sizes={""}
                className={` object-contain flex flex-shrink-0`}
              />
            </Link>

            <div className="h-full hidden lg:block">
              <ul className="flex items-center text-sm text-gray-500 gap-4 font-extrabold relative">
                {navItems.slice(0, 5).map((item, index) => (
                  <li
                    key={index}
                    className="justify-between flex flex-col text-sm items-center space-y-8 font-medium"
                  >
                    <Link href={item.link}>
                      <span className="block px-2 py-1 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 cursor-pointer w-full">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}

                {navItems.length > 4 && (
                  <li ref={moreMenuRef} className="relative">
                    <button
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="flex items-center gap-1 px-4 py-2 text-base text-gray-300 hover:text-white font-medium"
                    >
                      More
                      <ChevronDown
                        className={`transition-transform duration-300 text-gray-300 hover:text-white ${
                          showMoreMenu ? "rotate-180" : ""
                        }`}
                        size={18}
                      />
                    </button>

                    <AnimatePresence>
                      {showMoreMenu && (
                        <motion.ul
                          variants={staggerContainer}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="absolute right-0 mt-2 bg-bg1 border border-gray-700 rounded-md shadow-md z-50 w-48 py-2"
                        >
                          {navItems.slice(5).map((item, index) => (
                            <motion.li
                              key={index}
                              variants={staggerItem}
                              className="w-full"
                            >
                              <Link href={item.link}>
                                <span
                                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white transition-all"
                                  onClick={() => setShowMoreMenu(false)}
                                >
                                  {item.name}
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div
            className="hidden lg:block bg-blue-600 text-white font-secondary text-sm py-2 px-4 rounded-full shadow-sm cursor-pointer font-medium"
            onClick={() => setTriggerModal(true)}
          >
            <button className="cursor-pointer"> Get Started</button>
          </div>
          <div
            className="text-3xl lg:hidden cursor-pointer z-50"
            onClick={toggleMenu}
          >
            <HiMenu color="black" />
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
              className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
              onClick={toggleMenu}
            />

            {/* Popup Box */}
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-5 left-1/2 transform -translate-x-1/2  w-11/12 max-w-md bg-white rounded-2xl shadow-2xl z-50 lg:hidden"
            >
              {/* Close button */}
              <div className="absolute top-4 right-4 text-2xl cursor-pointer">
                <IoMdClose
                  color="gray"
                  onClick={toggleMenu}
                  className="hover:text-gray-700 transition-colors"
                />
              </div>

              {/* Popup content */}
              <div className="p-8 pt-12">
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
                    >
                      <div
                        className="block w-full text-center py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200 cursor-pointer"
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>

                {/* Get Started button */}
                <div className="mt-3 ml-1 flex w-full items-center justify-center">
                  <button
                    className="bg-blue-600 text-white font-medium text-sm py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                    onClick={() => {
                      setTriggerModal(true);
                      toggleMenu();
                    }}
                  >
                    Get Started
                  </button>
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
