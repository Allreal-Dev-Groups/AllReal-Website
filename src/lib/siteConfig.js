export const siteConfig = {
  name: "Allreal",
  description:
    "Discover India’s leading VR and Mixed Reality healthcare training solutions. We specialize in immersive medical simulations, AR/VR hospital training, and gamified learning platforms that transform medical education and clinical skill development. As a cutting-edge biomedical XR company, we deliver realistic, data-driven, and interactive experiences for hospitals, universities, and healthcare professionals—advancing the future of medical training through innovation and technology.",
  author: "Machenn",
  email: "info@machenn.com",
  phone: "+91 8903772381",
  loacation: "Coimabatore , TN ",
  socials: {
    instagram: "https://www.instagram.com/allreal.io/",
    linkedin:
      "https://www.linkedin.com/company/allreal-machenn/posts/?feedView=all",
    youtube: "https://www.youtube.com/@AllReal-Machenn",
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
    count: 5,
    label: "Years of Experience",
  },
];

export const navOption = [
  { name: "Home", url: "/" },
  // { name: "Product Hub", url: "/" },
  // { name: "Services", url: "/" },
  // { name: "Impact stories", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Contact us", url: "/#contact_us" },
  // { name: "Join Us", url: "/" },
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
  { type: "video", src: "/videos/Machenn_Portfolio_Video.mp4" },
  { type: "image", src: "/images/logo.png" },
  { type: "image", src: "/images/Banner1.jpg" },
  { type: "image", src: "/images/Banner2.jpg" },
  { type: "image", src: "/images/Banner3.jpg" },
];

export const testimonials = [
  {
    name: " Sreya Boddeti",
    role: "",
    text: "The step-by-step guidance made it so simple to learn CPR. Each instruction appeared clearly, and the timing between steps felt natural, almost like having a real instructor beside me.",
  },
  {
    name: "Dr. Vijai Kumar",
    role: "",
    text: "The feedback system was spot-on. It showed me exactly where I was going wrong and helped me correct it immediately. It’s an excellent way to build real confidence in performing CPR",
  },
  {
    name: "Dr. Nivedita Jena",
    role: "",
    text: "I really liked how clear the voice and visuals were. The instructions were easy to    understand, and the combination of visuals and sound made the whole experience stress free and enjoyable",
  },
  {
    name: "Nilesh Sathish LeLe",
    role: "",
    text: "The sounds and environment made it feel like a real emergency. The 3D visuals and spatial audio completely drew me in, it felt like I was right there in a real situation.",
  },
  {
    name: "Poorvik",
    role: "",
    text: "The interface is clean and beginner-friendly. I never felt confused about what to do next, every step was easy to follow and well designed.",
  },
  {
    name: "R K Anantha Krishnan",
    role: "Principal Consultant",
    text: "The timing and compression depth tracking made it feel like a professional training session. The data feedback is precise and helps maintain accuracy throughout the process",
  },
];
