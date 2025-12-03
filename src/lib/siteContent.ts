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
      href: "https://linkedin.com/in/placeholder",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/alm-000",
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
  heroTitleLine: "Product · Growth · Automation",
  heroDescription:
    "Senior Product Manager & Founder with 10 years building, launching, and growing products across fintech, fashion, and retail. I work end to end from strategy and discovery through delivery and growth, turning messy problems into simple automated solutions that scale revenue.",
  heroTags: ["Product Strategy", "Growth", "Automation", "AI & Data", "E-commerce"],
  whatIDoTitle: "What I do",
  whatIDoDescription:
    "I work with brands, operators, and founders to ship product, grow revenue, and automate the boring parts so more energy goes into the work that matters.",
  whatIDoBullets: [
    "Product & growth strategy for DTC, SaaS, and e-commerce.",
    "Automation, AI, and n8n workflows that remove manual ops.",
    "Systems for operations, reporting, and continuous experimentation.",
  ],
  latestArticlesTitle: "Latest articles",
  featuredWorkTitle: "Featured work",
  viewWorkLabel: "View work",
  getInTouchLabel: "Get in touch",
  viewAllArticlesLabel: "View all articles →",
  viewAllWorkLabel: "View all work",
  articlesComingSoonMessage: "Articles are coming soon.",
  metadata: {
    title: "Home",
    description:
      "Product, growth, and automation for brands and systems that actually ship.",
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
      body: "I work across product, growth, and brand building — helping teams ship things that matter and build systems that make shipping easier over time. A lot of my work sits where strategy, execution, and operations overlap.",
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
      body: "I like working with teams that care about momentum and craft in equal measure. I'm open to product, growth, and automation work — fractional, advisory, or full-time — especially where there's a real problem to solve and a bias toward shipping.",
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
      "Get in touch about consulting, roles, or interesting product and growth problems.",
  },
  header: {
    title: "Contact",
    description:
      "Reach out if you're working on product, growth, or automation problems and want help turning ideas into shipped work — as an advisor, collaborator, or part of your team.",
  },
  emailSection: {
    heading: "Email",
    descriptionPrefix: "The fastest way to reach me is by email: ",
    emailLabel: "hello@alex-magee.com",
    emailHref: "mailto:hello@alex-magee.com",
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


