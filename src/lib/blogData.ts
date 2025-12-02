export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTimeMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-faster-with-smaller-bets",
    title: "Shipping Faster With Smaller Bets",
    description:
      "Why shrinking the scope of each release is the fastest way to learn, grow, and compounding product momentum.",
    publishedAt: "2024-09-01T09:00:00.000Z",
    tags: ["product", "growth", "execution"],
    readingTimeMinutes: 6,
  },
  {
    slug: "automation-that-actually-sticks",
    title: "Automation That Actually Sticks",
    description:
      "A practical way to use AI and n8n to remove real operational drag instead of creating dashboard debt.",
    publishedAt: "2024-10-12T09:00:00.000Z",
    tags: ["automation", "ai", "n8n", "operations"],
    readingTimeMinutes: 7,
  },
  {
    slug: "building-growth-systems-for-dtc-brands",
    title: "Building Growth Systems for DTC Brands",
    description:
      "Turning campaigns into systems so paid, lifecycle, and onsite work together instead of fighting each other.",
    publishedAt: "2024-08-15T09:00:00.000Z",
    tags: ["growth", "ecommerce", "dtc"],
    readingTimeMinutes: 8,
  },
  {
    slug: "ops-control-centers-for-founders",
    title: "Ops Control Centers for Founders",
    description:
      "How to design a simple operating view that keeps teams focused on the right numbers every week.",
    publishedAt: "2024-07-20T09:00:00.000Z",
    tags: ["operations", "dashboards", "systems"],
    readingTimeMinutes: 5,
  },
];


