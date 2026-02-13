// @ts-ignore
import configData from './config.json';

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  holidayMode: {
    enabled: boolean;
    message: string;
  };
  announcement: {
    enabled: boolean;
    message: string;
  };
  siteUrl: string;
  navigation: { name: string; href: string; }[];
  // Assuming social is also part of configData or will be added later
  social?: any; // Placeholder, as the provided snippet was malformed here
}

export const siteConfig: SiteConfig = {
  ...configData,
  siteUrl: configData.siteUrl || "https://der-rosa-knopf.de",
  announcement: { // Added announcement property
    enabled: false, // Default value, adjust as needed
    message: "", // Default value, adjust as needed
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Katalog", href: "/products" },
    { name: "Projekte", href: "/projects" },
    { name: "Kurse", href: "/courses" },
    { name: "Blog", href: "/blog" },
  ],
};
