export type NavItem = {
  href: string;
  label: string;
};

export type HeaderContent = {
  navItems: NavItem[];
  logoAlt: string;
  mobileToggleAriaLabel: string;
};

export const headerContent: HeaderContent = {
  navItems: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  logoAlt: "Alex Magee logo",
  mobileToggleAriaLabel: "Toggle navigation",
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterContent = {
  /**
   * The name used in the copyright line, e.g. "Alex Magee".
   */
  copyrightName: string;
  links: FooterLink[];
};

export const footerContent: FooterContent = {
  copyrightName: "Alex Magee",
  links: [
    { label: "Privacy", href: "#" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alex-m-13b23360/",
      external: true,
    },
  ],
};

export type HomeCopy = {
  heroName: string;
  heroTitleLine: string;
  heroDescription: string;
  heroTags: string[];
  whatIDoTitle: string;
  whatIDoDescription: string;
  whatIDoBullets: string[];
  latestArticlesTitle: string;
  featuredWorkTitle: string;
  viewWorkLabel: string;
  getInTouchLabel: string;
  viewAllArticlesLabel: string;
  viewAllWorkLabel: string;
  articlesComingSoonMessage: string;
  metadata: {
    title: string;
    description: string;
  };
};

export const homeCopy: HomeCopy = {
  heroName: "Alex Magee",
  heroTitleLine: "Product Management · Systems · Growth",
  heroDescription:
    "Senior Product Manager with 10 years building, launching, and growing products across fintech, fashion, and retail. I work end to end from strategy and discovery through delivery and growth, turning messy problems into simple systems that keep teams shipping.",
  heroTags: ["Product Strategy", "Growth", "Automation", "AI & Data", "E-commerce"],
  whatIDoTitle: "What I do",
  whatIDoDescription:
    "I build product and growth systems inside teams — focusing on the loops, automation, and decision-making that keep work moving without adding headcount.",
  whatIDoBullets: [
    "Product strategy and execution across discovery, delivery, and iteration.",
    "Growth and experimentation systems that tie directly to business metrics.",
    "Automation and analytics that reduce operational drag and surface the right signals.",
  ],
  latestArticlesTitle: "Latest articles",
  featuredWorkTitle: "Featured work",
  viewWorkLabel: "View work",
  getInTouchLabel: "Get in touch",
  viewAllArticlesLabel: "View all articles →",
  viewAllWorkLabel: "View all work",
  articlesComingSoonMessage: "Articles are coming soon.",
  metadata: {
    title: "Product Manager — Work & Writing",
    description:
      "Product management, growth, and automation — a portfolio of projects and writing focused on systems that actually ship.",
  },
};

export type AboutContent = {
  metadata: {
    title: string;
    description: string;
  };
  snapshot: {
    label: string;
    paragraphs: string[];
  };
  capabilities: {
    label: string;
    tags: string[];
  };
  sections: {
    background: {
      id: string;
      heading: string;
      body: string;
    };
    whatImGoodAt: {
      id: string;
      heading: string;
      bullets: string[];
    };
    whatImLookingFor: {
      id: string;
      heading: string;
      body: string;
    };
  };
};

export const aboutContent: AboutContent = {
  metadata: {
    title: "About",
    description: "A short overview of who I am and how I like to work.",
  },
  snapshot: {
    label: "Snapshot",
    paragraphs: [
      "Senior Product Manager & Founder with 10 years across fintech, fashion, and retail.",
      "Work spans strategy, discovery, delivery, and growth — with a bias toward automation and systems that reduce operational drag.",
    ],
  },
  capabilities: {
    label: "Capabilities",
    tags: [
      "Product Strategy",
      "Discovery",
      "Experiments",
      "Automation",
      "AI & Data",
      "Systems",
      "User Research",
      "Delivery",
    ],
  },
  sections: {
    background: {
      id: "background-heading",
      heading: "Background",
      body: "I work across product, growth, and brand building — helping teams ship things that matter and build systems that make shipping easier over time. A lot of my work sits where strategy, execution, and operations overlap, with a strong bias toward automated, data-backed flows.",
    },
    whatImGoodAt: {
      id: "what-im-good-at-heading",
      heading: "What I'm good at",
      bullets: [
        "Shipping fast, with clear scopes and feedback loops.",
        "Building growth systems and funnels that tie back to real business metrics.",
        "Automating operations with AI and n8n so teams can do deeper work.",
        "Translating between operators, marketers, and engineers.",
      ],
    },
    whatImLookingFor: {
      id: "what-im-looking-for-heading",
      heading: "What I'm looking for",
      body: "I like working with teams that care about momentum and craft in equal measure. I’m most energised by products with real complexity under the hood — data, operations, and growth loops — where there’s room to design the system as well as the surface.",
    },
  },
};

export type WorkPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  header: {
    title: string;
    description: string;
  };
  projectsSectionAriaLabel: string;
  readMoreLabel: string;
};

export const workPageContent: WorkPageContent = {
  metadata: {
    title: "Work",
    description: "A selection of projects across product, growth, and automation.",
  },
  header: {
    title: "Work",
    description:
      "A selection of projects across product, growth, and automation. Names, numbers, and details are simplified and anonymized where needed, but the shape of the work is real.",
  },
  projectsSectionAriaLabel: "Projects",
  readMoreLabel: "Read more →",
};

export type ContactPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  header: {
    title: string;
    description: string;
  };
  emailSection: {
    heading: string;
    descriptionPrefix: string;
    emailLabel: string;
    emailHref: string;
  };
  formSection: {
    heading: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
    };
    submitLabel: string;
  };
};

export const contactPageContent: ContactPageContent = {
  metadata: {
    title: "Contact",
    description:
      "Get in touch about product, growth, automation, or to share feedback on any of the projects and writing here.",
  },
  header: {
    title: "Contact",
    description:
      "Reach out if you're working on product, growth, or automation problems and want to compare notes, share context, or talk through ideas.",
  },
  emailSection: {
    heading: "Email",
    descriptionPrefix: "The fastest way to reach me is by email: ",
    emailLabel: "alex.l.magee@gmail.com",
    emailHref: "mailto:alex.l.magee@gmail.com",
  },
  formSection: {
    heading: "Contact form",
    fields: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "What are you working on and how can I help?",
    },
    submitLabel: "Send message",
  },
};


