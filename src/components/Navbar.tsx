"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const currentRoute = usePathname();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost w-[150px] md:w-[250px] normal-case text-sm md:text-xl" title="home">
          Free Resume Generator
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              href="/new"
              className={currentRoute === "/new" ? "active" : undefined}
            >
              New
            </Link>
          </li>
          <li>
            <Link
              href="/print"
              className={currentRoute === "/print" ? "active" : undefined}
            >
              Print
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
