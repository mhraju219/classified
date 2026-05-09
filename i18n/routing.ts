import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar", "bn", "ur", "hi", "ru", "fa", "es"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: ReadonlyArray<Locale> = ["ar", "ur", "fa"];

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.includes(locale as Locale);
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
