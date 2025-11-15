"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Wand2, Hammer as Hanger, User } from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home", regex: /^\/$/ },
    { href: "/shop", icon: ShoppingBag, label: "Shop", regex: /^\/shop/ },
    //{ href: "/try-on", icon: Wand2, label: "Try On", regex: /^\/try-on/ },
    {
      href: "/wardrobe",
      icon: Hanger,
      label: "Wardrobe",
      regex: /^\/wardrobe/,
    },
    { href: "/profile", icon: User, label: "Profile", regex: /^\/profile/ },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-300/30 backdrop-blur-xl rounded-4xl shadow-lg m-5">
      <div className="flex items-center justify-around h-20 max-w-screen-xs">
        {navItems.map((item) => {
          const isActive = item.regex.test(pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs text-center font-medium line-clamp-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
