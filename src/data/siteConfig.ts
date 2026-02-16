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
  navigation: { name: string; href: string }[];
  features: {
    blog: boolean;
    shop: boolean;
    projects: boolean;
    courses: boolean;
  };
}

export const siteConfig: SiteConfig = {
  ...configData,
  siteUrl: configData.siteUrl || "https://der-rosa-knopf.de",
  announcement: {
    enabled: false,
    message: "",
  },
  navigation: [
    { name: "Home", href: "/" },
    ...(configData.features?.shop ? [{ name: "Shop", href: "/products" }] : []),
    ...(configData.features?.projects
      ? [{ name: "Projekte", href: "/projects" }]
      : []),
    ...(configData.features?.courses ? [{ name: "Kurse", href: "/courses" }] : []),
    ...(configData.features?.blog ? [{ name: "Blog", href: "/blog" }] : []),
  ],
};
