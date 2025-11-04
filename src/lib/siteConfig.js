export const siteConfig = {
  name: "PuviArch Studio",
  description: "Creative developer crafting immersive experiences.",
  author: "PuviArch",
  email: "hello@example.com",
  phone: "+1 (555) 123-4567",
  loacation:"Coimabatore , TN",
  socials: {
    github: "https://github.com/puviarch",
    linkedin: "https://linkedin.com/in/puviarch",
  },
  theme: "dark",
};

export const StatusData = [
  {
    count: 20,
    label: "Awards & Recognition",
  },
  {
    count: 15,
    label: "Creative minds",
  },
  {
    count: 30,
    label: "Projects completed",
  },
  {
    count: 50,
    label: "Years of Experience",
  },
];



export const navOption = [
  { name: "Home", url: "/" },
  { name: "Product Hub", url: "/projects" },
  { name: "Services", url: "/services" },
  { name: "Impact stories", url: "/stories" },
  { name: "Insights", url: "/blog" },
  { name: "Join Us", url: "/contact" },
];

export const SCROLL_SETTINGS = {
  smooth: true,
  lerp: 0.12,
  direction: "vertical",
  smoothTouch: true,
  touchMultiplier: 1.2,
  gestureDirection: "vertical",
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
};


export const assets = [
  { type: "video", src: "/videos/sample.mp4" },
  { type: "image", src: "/images/logo.png" },
];