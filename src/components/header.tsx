"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { navGroups, topLinks } from "@/lib/store";
import { useCart } from "./cart-context";

const announcementItems = [
  "Free shipping over $70",
  "60-day ritual guarantee",
  "Science-led skincare ritual",
];

export function Header() {
  const { openCart, itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement" aria-label="Store announcements">
        <div className="announcement-track">
          {[0, 1].map((group) => (
            <div className="announcement-group" aria-hidden={group === 1} key={group}>
              {announcementItems.map((item) => (
                <span key={`${group}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <header className="site-header">
        <button
          className="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className="mega-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <Link href={group.href}>{group.label}</Link>
              <div className="nav-panel">
                {group.children.map(([label, href]) => (
                  <Link href={href} key={label}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {topLinks.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="brand" href="/" aria-label="Satori home">
          SATORI
          <span>Organic Skin Care</span>
        </Link>
        <div className="header-actions">
          <Link className="icon-button" href="/collections/all" aria-label="Shop all products">
            <Search size={20} />
          </Link>
          <Link
            className="icon-button desktop-only"
            href="/pages/golden-standard-membership-info"
            aria-label="Membership and rewards"
          >
            <UserRound size={20} />
          </Link>
          <button className="cart-button" onClick={openCart} aria-label="Open cart">
            <ShoppingBag size={20} />
            <span>Cart</span>
            {itemCount > 0 ? <b>{itemCount}</b> : null}
          </button>
        </div>
      </header>
      <div className={`mobile-nav-panel ${isMenuOpen ? "is-open" : ""}`}>
        {[...navGroups.map((group) => [group.label, group.href] as const), ...topLinks].map(
          ([label, href]) => (
            <Link href={href} key={label} onClick={() => setIsMenuOpen(false)}>
              {label}
            </Link>
          ),
        )}
      </div>
    </>
  );
}
