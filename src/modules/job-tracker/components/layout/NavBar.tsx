"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Saved", href: "/saved" },
    { name: "Digest", href: "/digest" },
    { name: "Settings", href: "/settings" },
    { name: "Proof", href: "/proof" },
];

export function NavBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="h-16 border-b border-muted bg-background sticky top-0 z-40">
            <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo / Home Link */}
                <Link href="/" className="font-serif font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    Job Notification Tracker
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 h-full">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative h-full flex items-center text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-muted p-4 shadow-sm flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/5 text-primary"
                                        : "text-muted-foreground hover:bg-muted/10 hover:text-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
