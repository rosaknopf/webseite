// @ts-ignore
import configData from './config.json';

export const siteConfig = {
  ...configData,
  siteUrl: "https://der-rosa-knopf.de",
  navigation: [
    { name: "Home", href: "/" },
    { name: "Katalog", href: "/products" },
    { name: "Projekte", href: "/projects" },
    { name: "Kurse", href: "/courses" },
    { name: "Blog", href: "/blog" },
  ],
};

