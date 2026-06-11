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
    /** App store listings, for projects shipped as mobile apps. */
    ios?: string;
    android?: string;
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
    slug: "myrutgers-portal",
    title: "myRutgers portal and mobile app",
    summary:
      "The next-generation student portal for Rutgers University — a React web app and Flutter mobile app serving 200,000+ users per month across four campuses. I joined as senior engineer to get the project on track and out the door, leading a team of eight student developers.",
    caseStudy: {
      problem:
        "myRutgers is the front door to university life for every Rutgers student and employee: registration, paychecks, benefits, alerts, campus services. The legacy uPortal-based site couldn't deliver the personalized, mobile-first experience students expected, and the rebuild — React on web, Flutter on mobile, a Spring Boot API bridging old and new backend services — was underway but struggling to ship. There were no automated tests, releases were manual, and the team, composed largely of part-time student developers, was building without direct input from the students they were building for.",
      approach:
        "The architecture was already chosen; my job was to make it shippable. I came in as lead developer and the interface to university stakeholders, and focused on the practices the project was missing. I introduced automated testing where there had been none, replaced manual Xcode and Play Console uploads with CI/CD through GitHub Actions and Fastlane, and started surveying students so feature decisions traced back to actual needs rather than assumptions. I built out documentation in Confluence and a Next.js docs site so a rotating student team could onboard without tribal knowledge. Day to day I was the lead reviewer across the codebases, mentoring eight student developers and coordinating with the other engineers from onboarding through production releases.",
      result:
        "The portal shipped and runs today at my.rutgers.edu, serving 200,000+ monthly users across Rutgers' four campuses, with the mobile app live on both stores. The practices stuck: automated deployments and good code review practices outlived my tenure. If I did it again, I'd introduce automated testing alongside the first CI pipeline rather than after it — new practices land easiest when they arrive together.",
    },
    stack: [
      "React",
      "Flutter",
      "Dart",
      "Java",
      "Spring Boot",
      "Firebase",
      "GitHub Actions",
      "Fastlane",
    ],
    links: {
      live: "https://my.rutgers.edu/",
      ios: "https://apps.apple.com/us/app/myrutgers/id1564303921",
    },
    featured: true,
  },
  {
    slug: "msu-mobile-app",
    title: "MSU Mobile app",
    summary:
      "The official Michigan State University app — campus maps, courses, grades, dining, and bus routes for one of the largest universities in the US. I was the lead designer and a mobile developer on the four-person team that built and launched it.",
    caseStudy: {
      problem:
        "Michigan State serves a campus community of over 100,000 students, staff, and faculty across a 5,200-acre campus, and in 2017 had no modern official mobile app. Information students needed daily — class schedules, grades, dining menus, bus arrivals, campus navigation — was scattered across separate websites never designed for phones. The university needed a single, fast, native experience that could survive the load spikes of a Big Ten campus: the first day of classes, move-in week, game days.",
      approach:
        "I led design and worked as one of the mobile developers, so the process started long before code: I interviewed students about how they actually navigated campus life, turned those findings into design case studies, and iterated mockups against real student feedback before we committed to building a screen. On the engineering side, we built fully native clients in Swift and Kotlin rather than a cross-platform wrapper, because map performance and platform-correct interactions were the product. Both clients speak GraphQL to a Ruby on Rails backend, chosen so each screen fetches exactly the data it needs — a meaningful saving on campus networks and a contract that let iOS and Android evolve independently.",
      result:
        "The app launched to the full campus community of 100,000+ students and staff and sustained over 8,000 concurrent users at peak. It remains MSU's official app on both stores today, eight years later — the architecture we laid down is still shipping releases. Building it taught me the discipline I'd carry forward: research before design, design the API contract first, and treat peak load as the requirement, not the edge case.",
    },
    stack: ["Swift", "Kotlin", "GraphQL", "Ruby on Rails"],
    links: {
      live: "https://mobile.msu.edu/",
      ios: "https://apps.apple.com/us/app/michigan-state-university/id1356578108",
      android:
        "https://play.google.com/store/apps/details?id=edu.msu.msumobile",
    },
    featured: true,
  },
  {
    slug: "msu-campus-maps",
    title: "MSU campus maps",
    summary:
      "The official campus map for Michigan State University — a PHP and JavaScript web app with an interactive map of every building, parking lot, and bus route on one of the largest campuses in the US. I built it from the ground up as a student engineer, and it's still in production at maps.msu.edu more than nine years later.",
    caseStudy: {
      problem:
        "MSU's campus covers 5,200 acres and hundreds of buildings, and the existing campus map wasn't built for how people actually arrived at it: on a phone, mid-walk, looking for a building, a visitor parking lot, or a construction detour. The university needed a map that worked on any device, met accessibility standards, and could be maintained as campus changed — new buildings, closed roads, shifting parking — without a redesign each time.",
      approach:
        "I rebuilt the site from scratch in PHP, JavaScript, and MySQL, iterating on the previous version rather than discarding what worked. The core of the rebuild was the interactive map: searchable buildings and parking with shareable deep links, so departments could link directly to a location (?location= URLs that still work today). I introduced responsive design so a single codebase served desktop and mobile, optimized the site for SEO, and ran accessibility reviews to hold it to WCAG AA — campus maps are exactly the kind of site where a screen-reader user can't be an afterthought.",
      result:
        "The site runs today at maps.msu.edu, serving over 8,000 hits a day at peak, and the location deep-links I designed are still how campus departments link to buildings. This was one of the first production websites I ever built. Going back today I'd add an automated test suite and accessibility checks in CI from the first commit — the same practices I now require of my own teams.",
    },
    stack: ["PHP", "JavaScript", "MySQL", "HTML/CSS"],
    links: {
      live: "https://maps.msu.edu/",
    },
    featured: true,
  },
  {
    slug: "msu-search-services",
    title: "MSU search services",
    summary:
      "The search layer for Michigan State University — five web properties including search.msu.edu, the people directory, and the A–Z index — averaging over 400,000 sessions per month. I maintained and modernized the suite as a student software engineer.",
    caseStudy: {
      problem:
        "Search is how most people navigate a university the size of MSU: find a person, a department, a page across hundreds of independently run sites. The search properties predated responsive design and modern accessibility standards, and each needed continuous updates to stay accurate, fast, and usable on the phones most visitors were now arriving on.",
      approach:
        "I wasn't the lead on this suite — I supported it, and that's where I learned to work in production code I didn't write. search.msu.edu itself was built on AngularJS (Angular 1) with PHP behind it; I updated and restyled the properties, brought responsive design to the templates, optimized for SEO, and ran accessibility reviews across MSU's web properties to maintain WCAG AA compliance — the skip links and accessibility statements on those pages today reflect that work.",
      result:
        "The five properties handled over 400,000 sessions per month and remain in service at search.msu.edu. The work was my proving ground: it's what landed me the spot on the MSU mobile app team, and the accessibility habits I built here became a standard I've carried through every project since — including the federal WCAG compliance work on the CMS suite.",
    },
    stack: ["AngularJS", "PHP", "JavaScript", "MySQL", "HTML/CSS"],
    links: {
      live: "https://search.msu.edu/",
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
        "I split the build into two services. The frontend is React with Redux Toolkit for cart and product state, styled with Tailwind CSS to match the Behance design closely. Behind it sits a REST API I built with Express, Node, and MongoDB, serving roughly ninety products across nine categories with full CRUD routes — fetch, search by name, create, update, and delete. Keeping the API separate meant the storefront consumed data the same way a production app would, rather than reading from a local fixture. Despite the timebox, the storefront shipped with the discipline of a larger project: TypeScript, Airbnb ESLint with jsx-a11y, Prettier, automated tests, and a CI workflow from the start.",
      result:
        "A working full-stack storefront, from designer mockup to functioning cart, in three days. It's also a useful time capsule: built in 2022, it shows my fundamentals before MDCT sharpened them. Today I'd extend TypeScript past the storefront into the API, which is still plain JavaScript, and manage database credentials through environment variables instead of a config file passed around by hand. That delta is the point — the instincts were there; the rigor came with experience.",
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
