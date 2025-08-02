import Image from "next/image";
import Link from "next/link";
import FooterLogo from "../assets/Choose-footer.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const data = [
  {
    title: "Features",
    items: [
      { name: "Restaurant Loyalty Program", link: "/features/loyalty-program" },
      { name: "Restaurant Online Ordering", link: "/features/online-ordering" },
      { name: "Restaurant Website Builder", link: "/features/website-builder" },
      {
        name: "Restaurant Zero-Commission Delivery",
        link: "/features/delivery-without-commissions",
      },
      {
        name: "Restaurant Automated Marketing",
        link: "/features/automated-marketing",
      },
    ],
  },
  {
    title: "Actions",
    items: [
      { name: "About us", link: "/about-us" },
      { name: "Why Choose", link: "/why-choose" },
    ],
  },
  {
    title: "Quick Links",
    items: [
      { name: "Get started", link: "/book-a-demo", blank: false },
      {
        name: "Login",
        link: "https://restaurant.choosepos.com/login",
        blank: true,
      },
      { name: "Blogs", link: "/blogs", blank: false },
      { name: "Pricing", link: "/pricing", blank: false },
      { name: "Terms & Conditions", link: "/terms-conditions", blank: false },
      { name: "Privacy Policy", link: "/privacy-policy", blank: false },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-primary text-white px-4 sm:px-6 lg:px-12 xl:px-24 py-8 lg:py-12 md:rounded-t-[80px] rounded-t-[40px] mx-2 min-h-[30rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1440px] 2xl:mx-auto lg:grid-cols-4 gap-8">
        {/* Footer Logo */}
        <div className="mr-10 space-y-4">
          <Image
            src={"fff"}
            width={200}
            height={200}
            alt="Choose Logo"
            className="mb-4 w-[200px]"
          />
          <p className="font-figtree text-sm text-darkBgSubText">
            Enhance your online discovery, turn first-time visitors into
            regulars, and improve your margins with 0% commission on delivery.
          </p>
          <div className="flex space-x-4 pt-4">
            <Link
              aria-label="Instagram"
              href="/"
              target="_blank"
              className="hover:opacity-80"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <FaInstagram className="w-5 h-5" />
              </div>
            </Link>
            <Link
              aria-label="LinkedIn"
              href="/"
              target="_blank"
              className="hover:opacity-80"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <FaLinkedinIn className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 font-clash">Features</h3>
          <ul className="space-y-4">
            {data[0].items.map((item, index) => (
              <li
                key={index}
                className="text-darkBgSubText font-figtree text-base hover:text-white cursor-pointer"
              >
                <Link target={"_self"} href={"/"}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 font-clash">Company</h3>
          <ul className="space-y-4">
            {data[1].items.map((item, index) => (
              <li
                key={index}
                className="text-darkBgSubText font-figtree text-base hover:text-white cursor-pointer"
              >
                <Link href={"/"}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Compare Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 font-clash">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {data[2].items.map((item, index) => (
              <li
                key={index}
                className="text-darkBgSubText font-figtree text-base hover:text-white cursor-pointer"
              >
                <Link href={"/"}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
