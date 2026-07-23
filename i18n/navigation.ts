import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/*
  Locale-aware navigation wrappers. Use these `Link`/`useRouter`/`usePathname`
  instead of next/navigation so internal links keep the active locale (and omit
  the prefix for the default English locale).
*/
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
