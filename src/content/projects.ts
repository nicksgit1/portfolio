export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Problem → approach → result. The case-study body, in order. */
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
  };
  stack: string[];
  links: {
    repo?: string;
    /** Separate backend/API repo, for projects split across repos. */
    api?: string;
    live?: string;
  };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "cms-mdct-suite",
    title: "CMS MDCT reporting suite",
    summary:
      "A suite of seven open-source applications that every US state uses to submit Medicaid and CHIP program data to the Centers for Medicare & Medicaid Services. I've worked on it since inception in 2022 — as an engineer, then senior engineer, now Director of Engineering.",
    caseStudy: {
      problem:
        "CMS collects complex program data from all 50 states and several territories: CHIP annual reports, managed care performance, Money Follows the Person progress, quality measures. The legacy intake processes couldn't validate data on submission, couldn't feed downstream analysts reliably, and couldn't keep up with report structures that change every year. CMS needed purpose-built collection tools that state administrators could actually use — and that could evolve without a rebuild each reporting cycle.",
      approach:
        "The suite is built as form-driven React + TypeScript applications on serverless AWS (Lambda, DynamoDB, S3, Cognito), deployed with CDK through GitHub Actions across three environments. The core design decision: every report is defined as a versioned JSON form template, so new report structures ship as data rather than code, with yup validation schemas enforced on both client and server and immutable field IDs serving as a stable contract for downstream analysts. Report metadata lives in DynamoDB while large form payloads live in S3, and changes stream over Kafka to CMS's analytics platform. I helped build MCR from the ground up — including its autosave system, which persists work-in-progress transparently as users move through long multi-page reports — implemented form-engine features like repeated field groups in MFP, and hardened HTML rendering against XSS. The suite tests accessibility continuously with axe and pa11y; WCAG compliance is a federal requirement, not an afterthought.",
      result:
        "All seven applications run in production on cms.gov, serving state administrators in every US state plus territories, processing between 53 and over 1,000 reports per application each cycle. The team has grown from 14 to 30 people since launch. I've grown with it: 285 commits across four of the repos, a code reviewer across the suite since the start, maintainer of CARTS as a senior engineer, and since October 2025 Director of Engineering with six direct reports, helping maintain three of the applications.",
    },
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "AWS CDK",
      "Kafka",
      "Jest",
      "Playwright",
    ],
    links: {
      repo: "https://github.com/Enterprise-CMCS/macpro-mdct-mcr",
    },
    featured: true,
  },
  {
    slug: "grocery-shopping-app",
    title: "Grocery shopping app",
    summary:
      "A full-stack grocery store — React storefront recreated from a designer's concept, backed by my own Express and MongoDB REST API — designed, built, and shipped solo in three days.",
    caseStudy: {
      problem:
        "I came across a grocery shopping app concept on Behance and wanted to see it live, not just admire the mockup. That set the challenge: faithfully translate a designer's static vision into a working product — real data, real cart, real API — within a three-day timebox. Most quick CRUD demos skip the hard part, which is honoring someone else's design down to the pixel.",
      approach:
        "I split the build into two services. The frontend is React with Redux Toolkit for cart and product state, styled with Tailwind CSS to match the Behance design closely. Behind it sits a REST API I built with Express, Node, and MongoDB, serving roughly ninety products across nine categories with full CRUD routes — fetch, search by name, create, update, and delete. Keeping the API separate meant the storefront consumed data the same way a production app would, rather than reading from a local fixture.",
      result:
        "A working full-stack storefront, from designer mockup to functioning cart, in three days. It's also a useful time capsule: built in 2022, it shows my fundamentals before MDCT sharpened them. Today I'd build it with TypeScript end to end, manage configuration through environment variables instead of a shared config file, add automated tests from the first commit, and reach for React Query over hand-rolled data fetching. That delta is the point — the instincts were there; the rigor came with experience.",
    },
    stack: [
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    links: {
      repo: "https://github.com/ntsummers1/Grocery-Shopping-React-App",
      api: "https://github.com/ntsummers1/Grocery-Shopping-Express-API",
    },
    featured: false,
  },
];
