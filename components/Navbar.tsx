"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/visiotech.png";

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
      link: "/services",
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

  // Prevent scrolling when sidebar is open
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

  return (
    <>
      <div
        className={`fixed ${"top-0"}  left-0 w-full px-2 !z-50  font-secondary 
       h-20 md:h-24 grid place-items-center border-b shadow-md transition-all duration-300 ${"bg-white"}`}
      >
        <div className="flex justify-between items-center px-6 xl:px-24 lg:px-12 w-full max-w-8xl mx-auto">
          <Link
            href={"/"}
            prefetch={false}
            passHref
            className="relative w-24 md:!w-[200px] h-[120px] min-w-[115px] min-h-[53px]"
          >
            <Image
              src={logo || ""}
              alt="logo"
              fill
              sizes={""}
              className={`-mt-5 md:mt-0 object-contain`}
            />
          </Link>

          <div className="h-full hidden lg:block">
            <ul className="flex items-center text-xl text-black font-extrabold relative">
              {navItems.slice(0, 5).map((item, index) => (
                <li
                  key={index}
                  className="justify-between flex flex-col text-base items-center space-y-8 font-medium"
                >
                  <Link href={item.link}>
                    <span className="block px-4 py-2 transition-all duration-300 cursor-pointer w-full">
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

          {/* Menu Button and Order Now grouped together */}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white sm:w-[400px] bg-primaryColor font-primary shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button positioned in top right corner */}
        <div className="absolute top-6 right-6 text-3xl cursor-pointer">
          <IoMdClose color="black" onClick={toggleMenu} />
        </div>

        <div className="flex flex-col h-full pt-24">
          <ul className="flex flex-col text-xl text-gray-900">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="justify-between flex flex-col text-lg items-center space-y-8 font-medium"
              >
                <Link
                  href={
                    item.name === "Our Specialities"
                      ? "/#our-specialities-mobile"
                      : item.link
                  }
                  target={item.name == "Bar Menu" ? "_blank" : "_self"}
                >
                  <span
                    className="block px-4 py-2 transition-all duration-300 cursor-pointer w-full hover:text-primaryColor/80 uppercasetext-bg3 hover:text-white"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div ref={observerTargetRef} style={{ height: "1px" }} />
    </>
  );
};

export default Navbar;
