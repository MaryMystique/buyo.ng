"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { subscribeToNewsletter } from "@/lib/firestore";
import toast from "react-hot-toast";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Clothing", href: "/products?category=clothing" },
    { label: "Appliances", href: "/products?category=appliances" },
    { label: "Kitchen", href: "/products?category=kitchen" },
    { label: "Cosmetics", href: "/products?category=cosmetics" },
  ],
  account: [
    { label: "My Account", href: "/account" },
    { label: "My Orders", href: "/account" },
    { label: "Cart", href: "/cart" },
    { label: "Login / Register", href: "/auth" },
  ],
  support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    if(!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubLoading(true);

    try {
      const result = await subscribeToNewsletter(email.trim());

      if (result.message === "already_subscribed") {
        toast.error("This email is already subscribed!");
      } else if (result.success) {
        toast.success("🎉 You're subscribed! Welcome to Buyo.ng");
        setEmail(""); // clear input
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubLoading(false);
    }
  }
    
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-orange-500">
                Buyo<span className="text-white">.ng</span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Your one-stop shop for clothing, home appliances, kitchen
              utensils and cosmetics. Quality products, fast delivery
              across Nigeria.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="mailto:hello@buyo.ng"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Mail size={15} className="text-orange-500 shrink-0" />
                hello@buyo.ng
              </a>
              <a
                href="tel:+2348012345678"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Phone size={15} className="text-orange-500 shrink-0" />
                +234 801 234 5678
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-orange-500 shrink-0" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors group"
                >
                  <Icon
                    size={16}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold mb-1">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm">
                Get the latest deals and new arrivals straight to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subLoading}
                className="flex-1 md:w-64 bg-gray-800 border border-gray-700 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subLoading}
                className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subLoading ? "..." : "Subscribe"}
              </button>
            </form>
           </div>
          </div>
        </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>
            © {new Date().getFullYear()} Buyo.ng. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Licensed in Nigeria</span>
            <span className="flex items-center gap-1">
              Secured by
              <span className="text-orange-500 font-semibold ml-1">
                Paystack
              </span>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}