"use client";
import React, { useState, useEffect } from 'react';
import { Brain, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const footerLinks = {
    product: ['Features', 'How it Works', 'Pricing', 'FAQ'],
    company: ['About Us', 'Careers', 'Blog', 'Contact'],
    resources: ['Career Guide', 'Success Stories', 'Research', 'Support'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  const SocialIcons = [Twitter, Linkedin, Instagram];

  if (!mounted) return null;

  return (
    <footer
      className={`border border-t dark:border-slate-600/[0.40]  bg-white  dark:bg-black text-gray-900 dark:text-gray-200`}
    >
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                {/* <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl"
                > */}
                  ⚡
                {/* </motion.span> */}
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  Career Forge AI
                </h1>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
            Empowering job seekers with AI-powered resume optimization tools to land their dream jobs faster.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {SocialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-600 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {Object.entries(footerLinks).slice(0, 3).map(([section, links]) => (
            <div key={section} className="space-y-6">
              <h3 className="font-semibold capitalize bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                {section}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
      

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Career Forge AI. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>By Team Frenzied Flames </span>
            </div>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
