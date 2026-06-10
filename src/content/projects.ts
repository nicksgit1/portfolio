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
];
