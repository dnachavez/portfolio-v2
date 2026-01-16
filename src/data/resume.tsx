import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Dan Chavez",
  initials: "DC",
  url: "https://dnachavez.dev",
  location: "Cebu City, PH",
  locationLink: "https://www.google.com/maps/place/cebu+city",
  description:
    "AI Engineer specializing in multi-agent systems and AI automation. I build scalable AI platforms that deliver measurable impact.",
  summary:
    "I specialize in building production AI systems that solve real business problems at scale. My work focuses on multi-agent architectures, AI automation, and serverless infrastructure that consistently delivers double-digit efficiency gains and cost reductions. I've led teams shipping high-uptime platforms handling thousands of daily transactions, and built autonomous AI agents that resolve the majority of tasks without human intervention. I move fast from concept to production, prioritizing measurable impact over complexity.",
  avatarUrl: "/avatar/me-light.png",
  skills: [
    {
      category: "Languages",
      logoUrl: "/skills/backend.png",
      skills: ["Python", "TypeScript", "JavaScript", "PHP"],
    },
    {
      category: "Frameworks & Libraries",
      logoUrl: "/skills/frameworks-libraries.png",
      skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "Laravel",
        "CodeIgniter",
        "LangChain",
        "LangGraph",
        "LangSmith",
        "Vue.js",
        "Express.js",
      ],
    },
    {
      category: "AI/ML",
      logoUrl: "/skills/ai-tools.png",
      skills: [
        "OpenAI",
        "Google Gemini",
        "Anthropic Claude",
        "Hugging Face Transformers",
        "Pinecone",
        "Neo4j",
        "Azure Document Intelligence",
      ],
    },
    {
      category: "Automation",
      logoUrl: "/skills/automation-tools.png",
      skills: ["n8n", "Make", "Zapier"],
    },
    {
      category: "Cloud & DevOps",
      logoUrl: "/skills/cloud-deployment.png",
      skills: [
        "AWS",
        "GCP",
        "Firebase",
        "Vercel",
        "Netlify",
        "GitHub Actions",
        "CircleCI",
        "Serverless Framework",
        "Digital Ocean",
        "Replit",
        "cPanel",
      ],
    },
    {
      category: "Databases",
      logoUrl: "/skills/databases.png",
      skills: ["MySQL", "PostgreSQL", "DynamoDB", "Supabase", "Redis"],
    },
    {
      category: "Version Control",
      logoUrl: "/skills/development-tools.png",
      skills: ["Git", "GitHub", "Bitbucket"],
    },
    {
      category: "Design & Tools",
      logoUrl: "/skills/design-cms.png",
      skills: ["Figma", "Photoshop", "Canva", "WordPress", "Adobe Creative Suite"],
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "dna.chavez@outlook.com",
    tel: "+6399428166588",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/dnachavez",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dnachavez",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/dnachavez_dev",
        icon: Icons.x,

        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/dnachavez",
        icon: Icons.instagram,
        navbar: true,
      },
      TikTok: {
        name: "TikTok",
        url: "https://www.tiktok.com/@dnachavez",
        icon: Icons.tiktok,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "GoTeam",
      badges: [],
      href: "https://go.team",
      location: "Remote / Virginia Beach, VA",
      title: "AI Specialist",
      logoUrl: "/work-experience/goteam.png",
      start: "June 2025",
      end: "Present",
      description:
        "Led design and rollout of multi-agent AI automation platform across research, analysis, and project management workflows, balancing cost, latency, and reliability constraints to reduce operational load by 70% for cross-functional U.S. client teams. Architected n8n-based orchestration engine with intelligent task routing after evaluating event-driven vs schedule-based execution; chose hybrid approach to minimize latency while controlling API costs, eliminating 100% of manual triage and reducing operational overhead. Drove model selection for research agents by benchmarking OpenAI's o4-mini vs o3-deep-research, identifying 40% cost savings with o4-mini for routine research while reserving o3-deep-research for complex analysis requiring deeper reasoning, cutting research time by 80%. Designed financial analysis agent applying custom business validation logic to operational data; traded strict schema enforcement for flexible JSON output to reduce parsing failures by 85%, enabling reliable auto-population of Excel templates and cutting analysis cycles by 65%. Identified recurring task deadline risks and implemented proactive monitoring agents that analyze overdue patterns and post automated reminders, improving on-time completion by 45% and preventing escalation to client stakeholders. Established nightly schedule-based quality monitoring after diagnosing root cause of workflow errors as inconsistent task ownership data; introduced validation guards and ownership checks that reduced errors by 60% through early detection. Built comment-triggered automation system that parses natural language inputs to update task metadata; rejected regex-only approach due to high false-positive rates, implemented NLP-based intent classification that saved 15+ hours weekly in manual task administration with 95% accuracy. Developed document generator agents with memory-equipped processing and curated knowledge banks; evaluated template-first vs generative-first approaches, chose template-based generation to ensure brand consistency while automating PDF creation and reducing document cycle time by 90%. Designed cross-system data synchronization workflows between project management platforms and external databases; chose Zapier over custom ETL to minimize development and maintenance burden, eliminating duplicate entry and improving data consistency by 95%. Architected Next.js conversational agents with Supabase backends for goal setting and content publishing; evaluated serverless vs containerized deployment, chose Vercel Edge Functions for lower cold-start latency and built-in global CDN, increasing content output by 100% while maintaining sub-100ms response times. Designed bidirectional calendar synchronization system addressing scheduling fragmentation across dual Outlook calendars; evaluated one-way mirroring vs full two-way sync, implemented Power Automate workflow with event-driven triggers on create/update/delete operations, accepted eventual consistency tradeoff to simplify conflict resolution logic while eliminating 100% of manual calendar duplication and reducing scheduling conflicts by 80%.",
    },
    {
      company: "Framework",
      href: "https://frameworkos.ai",
      badges: [],
      location: "Remote / Cebu City, PH",
      title: "Founding Engineer",
      logoUrl: "/work-experience/framework.png",
      start: "September 2024",
      end: "March 2025",
      description:
        "Owned end-to-end design and solo development of AI responder system under ambiguous product requirements, evaluating retrieval-augmented generation (RAG) vs fine-tuning approaches; chose RAG for faster iteration and lower training costs, achieving 92% response accuracy while reducing implementation time by 60%. Architected AI Task Manager from zero to production, defining scope and technical strategy without external oversight; chose event-driven architecture over polling-based approach to minimize latency and resource consumption, enabling real-time task orchestration that reduced customer response cycles by 50%. Designed serverless infrastructure balancing cost and performance constraints; evaluated Lambda vs ECS Fargate, chose Lambda with concurrent execution limits and dead-letter queues to optimize cold-start latency while controlling runaway costs, maintaining 99.9% uptime and cutting infrastructure spend by 40%. Identified integration bottleneck risks early in third-party API dependencies; implemented circuit breaker pattern and exponential backoff retry logic to prevent cascade failures, reducing API timeout errors by 85% and improving system resilience during high-load periods. Drove technical decisions autonomously as sole engineer, establishing design patterns, API contracts, and error handling standards that became foundation for future team scaling, reducing onboarding friction and enabling 3x faster feature development velocity for subsequent hires.",
    },
    {
      company: "Tolstoy",
      href: "https://gotolstoy.com",
      badges: [],
      location: "Remote / Denver, CO",
      title: "Full Stack Engineer & AI Engineer",
      logoUrl: "/work-experience/tolstoy.png",
      start: "August 2024",
      end: "March 2025",
      description:
        "Led architecture and rollout of multi-agent AI communication system for interactive video platform serving 10,000+ businesses; balanced accuracy vs latency constraints by implementing parallel agent execution with 2-second timeout SLA, boosting response accuracy by 65% while maintaining sub-3s response times. Designed agent orchestration strategy after evaluating sequential vs parallel execution; chose weighted parallel approach with confidence-based ranking to maximize response quality while controlling API costs, reducing drafting time by 75% and cutting token consumption by 40%. Established prompt engineering framework and quantitative evaluation metrics (accuracy, relevance, coherence) after identifying inconsistent agent outputs; introduced systematic A/B testing and feedback loops that improved response quality scores by 40% and task completion rates by 55%. Architected unified inbox consolidating 5+ communication channels; evaluated pull-based polling vs webhook-based push, chose hybrid model to balance real-time delivery with API rate limit constraints, reducing communication management time by 40% while staying within vendor quotas. Re-architected serverless infrastructure after diagnosing scalability bottleneck in synchronous processing; migrated to SQS-based queue system with concurrent Lambda execution, enabling 3x request volume (30k→90k monthly) while maintaining 99.9% uptime and preventing outage during Black Friday peak. Optimized cloud costs by profiling execution patterns and right-sizing resources; identified over-provisioned memory allocations and cold-start inefficiencies, implemented tiered Lambda memory configs and provisioned concurrency for critical paths, cutting infrastructure spend by 20% while reducing p95 latency by 60%. Drove Linear API integration to automate task management workflows after manual ticket creation became cross-team bottleneck; designed webhook-triggered automation that routes support queries to engineering board automatically, reducing manual workload by 30% and improving ticket SLA compliance by 25%. Designed parallel ETL pipeline architecture to address data ingestion bottleneck limiting AI context quality; evaluated batch vs streaming, chose hybrid approach with message batching up to 100 records to optimize throughput without increasing error rates, achieving 250% data throughput improvement. Identified data loss risk in async processing flows; implemented idempotency keys, at-least-once delivery guarantees, and dead-letter queue monitoring, reducing data loss incidents from 12/month to 0 and improving AI agent reliability by 45%. Mentored 3 junior engineers through structured onboarding, design reviews, and pair programming; established code review standards and testing practices that reduced production bugs by 35%, accelerated team velocity by 20%, and enabled juniors to own features independently within 6 weeks. Championed adoption of AI development tools (GitHub Copilot, Claude, Windsurf) by demonstrating productivity gains through internal demos; created usage guidelines and best practices that reduced development cycle time by 30% and increased sprint story points by 25% across 8-person engineering team. Prototyped automated customer onboarding system addressing 6-week onboarding delay reported by Customer Success team; designed progress-tracking framework with milestone-based CSM notifications, validated with 5 beta customers, reduced average onboarding time to 3 weeks and improved product activation rate by 40%. Architected technical foundation for no-code AI workflow builder; evaluated Retool vs custom React implementation, chose React Flow-based visual editor for customization flexibility, enabling product team to demo automation builder to 20+ enterprise prospects without engineering dependency.",
    },
    {
      company: "Bilis Delivery",
      href: "https://bilisdelivery.com",
      badges: [],
      location: "Remote / Cebu City, PH",
      title: "Lead Full Stack Developer",
      logoUrl: "/work-experience/bilis.png",
      start: "April 2024",
      end: "December 2025",
      description:
        "Led architecture and development of food delivery platform from concept to production, scaling to 10,000+ orders and 2,000+ users in first year; evaluated monolith vs microservices, chose Laravel-based modular monolith with async job processing to minimize operational complexity while enabling future service extraction, maintaining 99.9% uptime during peak traffic. Designed real-time order tracking system balancing latency vs infrastructure cost; evaluated WebSocket persistence vs polling, chose WebSocket with fallback to long-polling for reliability, integrated Google Maps API with client-side position interpolation to reduce API calls by 60%, cutting customer support inquiries by 50%. Architected payment integration strategy supporting multiple methods (COD, credit card, in-app wallet); evaluated PSP vendor lock-in vs abstraction overhead, implemented payment gateway abstraction layer with Laravel Passport OAuth2 and SMS-based OTP, increasing payment success rate by 35% while enabling PSP switching without code changes. Designed zone-based driver matching algorithm addressing sub-optimal assignment causing 5-minute average wait times; evaluated distance-only vs multi-factor scoring, implemented composite ranking (proximity, vehicle type, availability) with Redis-cached driver state, accelerating assignment by 80% and reducing wait time to 90 seconds. Diagnosed performance bottleneck causing 3.2s page loads during traffic spikes; profiled queries with Laravel Telescope, identified N+1 queries and missing indexes, implemented eager loading and strategic indexing with Redis caching layer, reducing p95 load time to 0.8s (75% improvement) and preventing timeout-related cart abandonment. Anticipated concurrency issues at scale after observing race conditions in beta testing; implemented optimistic locking, batch processing with Laravel queues, and atomic database transactions with upsert operations, enabling 100+ concurrent orders during lunch rush without overselling inventory or double-charging customers. Designed multi-guard authentication architecture supporting 4 user types (customers, drivers, vendors, admins) with distinct permission models; evaluated separate databases vs unified schema, chose unified approach with Laravel Passport and custom guards to simplify data consistency while maintaining security isolation. Built granular RBAC system with JSON-configured permissions addressing frequent access control changes; rejected hardcoded role checks due to deployment friction, implemented module-level permission matrix enabling business team to adjust access across 12+ modules via config without engineering involvement. Architected backend as modular monolith using nwidart/laravel-modules after evaluating immediate microservices separation; chose monolith with strict module boundaries and service interfaces to accelerate initial development while preserving future migration path, reducing code coupling and improving maintainability by 60%.",
    },
    {
      company: "Develop Kreativity",
      href: "https://www.developkreativity.com",
      badges: [],
      location: "Remote / Cebu City, PH",
      title: "Co-Founder & Chief Technology Officer",
      logoUrl: "/work-experience/developkreativity.png",
      start: "November 2023",
      end: "December 2025",
      description:
        "Co-founded digital agency from zero to 15+ clients across healthcare, retail, and technology sectors; defined service portfolio strategy balancing specialization vs breadth, chose integrated offering (brand strategy, AI automation, software development, UI/UX, content production) to increase deal size and client LTV while establishing market differentiation. Directed technical strategy and delivery for 30+ client projects; established standardized project frameworks and reusable components to reduce custom development by 40%, enabling 50% reduction in project timelines while maintaining 95% client satisfaction and improving team utilization rates. Built AI automation practice integrating tools into client marketing workflows; evaluated build vs buy for automation tooling, chose no-code platforms (Make, Zapier) for speed-to-value vs custom development, reducing manual client operations by 50% and creating recurring revenue stream representing 30% of agency income. Architected technology stack strategy across client engagements; evaluated WordPress vs custom Laravel vs Next.js for different client segments, established decision matrix based on technical complexity, timeline, and budget constraints, enabling 20+ clients to scale digital operations 3x without proportional cost increases. Led brand strategy practice addressing client acquisition challenges in competitive markets; established repeatable methodology from discovery to execution, increasing average client engagement by 60% and follower growth by 120% while reducing strategy development time by 50% through process standardization. Established UI/UX design practice and standardized design system framework; evaluated Figma vs Adobe XD, chose Figma for collaboration capabilities and component libraries, delivered 25+ redesigns that improved average user satisfaction by 45% while reducing design iteration cycles from 4 weeks to 2 weeks. Built content production pipeline standardizing video and graphic workflows; identified bottleneck in asset review cycles, implemented milestone-based approval process with Adobe Creative Suite and Canva templates, produced 100+ brand assets increasing client social engagement by 80% while cutting production time by 35%. Drove AI chatbot integration strategy for client lead generation; evaluated platform costs vs conversion impact, implemented tiered chatbot sophistication based on client budget, improving response times by 70% and lead conversion rates by 35% while maintaining positive ROI across all implementations. Scaled cross-functional team from 2 co-founders to 10+ developers, designers, and marketers; established hiring criteria, onboarding processes, and skill development frameworks, delivering projects 20% faster than industry benchmarks while maintaining quality standards and enabling junior team members to lead client engagements within 3 months.",
    },
    {
      company: "University of Southern Philippines Foundation",
      href: "https://uspf.edu.ph",
      badges: [],
      location: "Cebu City, PH",
      title: "Full Stack Developer",
      logoUrl: "/work-experience/uspf.png",
      start: "July 2023",
      end: "July 2026",
      description:
        "Designed multi-agent AI chat system addressing 40% support request volume in student services; evaluated single-model vs multi-agent orchestration, chose LangGraph state-graph pipeline with specialized agents (admissions, registrar, financial) to improve context relevance, achieving 85% query resolution accuracy and reducing support staff workload by 40%. Architected mobile app consolidating 4 separate student services (digital ID, RFID attendance, statement-of-account, payments); evaluated native vs hybrid development, chose React Native with REST API integration to Pinnacle ERP to minimize maintenance overhead across iOS/Android, increasing digital service adoption by 35% while reducing IT support requests by 25%. Built queue management system after diagnosing 2-hour average wait times across 6 service offices as manual paper-ticket bottleneck; evaluated centralized vs distributed queue architecture, implemented Laravel/Vue.js web-based system with real-time WebSocket updates serving 500+ students daily, reducing wait times by 80% and enabling staff reallocation. Developed secure online election platform addressing vote-counting delays and transparency concerns; evaluated blockchain vs traditional database, chose MySQL with cryptographic vote hashing and audit trails to balance security with implementation complexity, enabling 3,000+ voters and reducing counting time from 1 hour to 15 minutes. Created digital repository system for 2,000+ theses and research papers after identifying manual filing as barrier to academic research; evaluated DSpace vs custom solution, built Laravel-based system with Elasticsearch for advanced search, eliminating manual filing processes and improving research accessibility by 70%. Led PowerEdge R440 server infrastructure upgrade and document management system deployment; evaluated on-premise vs cloud, chose on-premise with virtualization due to data residency requirements and budget constraints, eliminating manual inter-departmental document routing and improving workflow efficiency by 60%.",
    },
    {
      company: "MyToolz",
      href: "https://mytoolz.net",
      badges: [],
      location: "Remote / Bangladesh",
      title: "Back End Developer",
      logoUrl: "/work-experience/mytoolz.png",
      start: "July 2021",
      end: "December 2021",
      description:
        "Rebuilt high-traffic Blogger link locker after identifying critical security vulnerability in client-side base64 masking exposing protected URLs; evaluated client-side vs server-side approaches, migrated to externally hosted API with AES encryption and database ID obfuscation to prevent reverse engineering, improving security posture by 90% while maintaining sub-200ms response times. Implemented strict referrer validation layer addressing unauthorized content scraping costing platform revenue; evaluated IP-based vs referrer-based protection, chose HTTP referrer validation with origin verification to balance security with user experience, reducing unauthorized access by 70% without impacting legitimate traffic. Developed multi-purpose PHP API toolkit consolidating validation services (proxy detection, email verification, crypto balances, account checks); designed RESTful interface with rate limiting and caching to handle 10,000+ daily requests while preventing abuse and maintaining consistent sub-500ms p95 latency. Migrated validation logic from third-party APIs after identifying cost scalability issues and reliability dependencies; evaluated build vs buy tradeoffs, implemented in-house validation using cURL-based proxy checks and regex-based email filtering, reducing external API dependency by 40%, cutting operational costs by 50%, and improving uptime from 97% to 99.5%.",
    },
  ],
  education: [
    {
      school: "University of Southern Philippines Foundation",
      href: "https://uspf.edu.ph",
      degree: "Bachelor's Degree of Computer Science",
      logoUrl: "/education/uspf.png",
      start: "2022",
      end: "2026",
    },
    {
      school: "Dumalag Central National High School",
      href: "",
      degree: "Science, Technology, Engineering, and Mathematics (STEM)",
      logoUrl: "/education/dcnhs.png",
      start: "2020",
      end: "2022",
    },
  ],
  certifications: [
    {
      title: "Google Data Analytics Professional Certificate",
      href: "https://www.credly.com/badges/4ce028b3-daec-457d-a607-631fb74b5e1e",
      dates: "April 30th, 2025",
      description: "Issued by Coursera",
      image: "/certifications/google-data-analytics-professional.png",
    },
  ],
  projects: [
    {
      title: "ThinkOfATitle",
      href: "https://thinkofatitle.dnachavez.dev",
      dates: "April 2025",
      active: true,
      description:
        "ThinkOfATitle is an AI-powered tool that helps you generate creative and professional titles for academic papers, dissertations, theses, and research documents. It leverages Google's Gemini 2.0 Flash model to generate compelling titles and brief overviews for academic research papers, theses, and dissertations based on your research topic or field.",
      technologies: ["Next.js", "TypeScript", "Gemini"],
      links: [
        {
          type: "Website",
          href: "https://thinkofatitle.dnachavez.dev",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dnachavez/ThinkOfATitle",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/thinkofatitle.png",
      video: "",
    },
    {
      title: "Bilis Delivery",
      href: "https://bilisdelivery.com",
      dates: "June 2024 - Present",
      active: true,
      description:
        "Bilis Delivery is a logistics service that focuses on fast and efficient delivery of various items to your doorstep. This project is built with Laravel and Flutter, providing a web and android application for the logistics team, restaurant management, and for the customers. The system includes features such as real-time tracking, order management, and delivery status updates.",
      technologies: ["Flutter", "Dart", "Laravel", "MySQL", "Firebase"],
      links: [
        {
          type: "Website",
          href: "https://bilisdelivery.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/bilis-delivery.png",
      video: "",
    },
    {
      title: "SentiAI",
      href: "",
      dates: "April 2024",
      active: true,
      description:
        "It is capable of analyzing and classifying the sentiment of text data into positive, negative, or neutral categories.",
      technologies: ["Python", "JavaScript", "HTML", "CSS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dnachavez/fine-tuning-tinybert-for-sentiment-analysis",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/sentiai.png",
      video: "",
    },
    {
      title: "Lyons Global",
      href: "https://lyonsglobal.us",
      dates: "February 2024",
      active: true,
      description:
        "Lyons Global is the official website of Lyons Global™. The website is built with WordPress and features a custom theme, custom post types, and custom fields. Our team at Develop Kreativity redesigned their website using WordPress, creating a modern and user-friendly interface that showcases their expertise and services as a digital health solutions company.",
      technologies: ["WordPress"],
      links: [
        {
          type: "Website",
          href: "https://lyonsglobal.us",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/lyons-global.png",
      video: "",
    },
    {
      title: "USPF IoT Parking System",
      href: "",
      dates: "December 2023",
      active: true,
      description:
        "It aims to innovate the parking management of the university to solve the problem of managing parking spaces. The project's web interface is built with CodeIgniter 4 and uses Arduino Uno R4 WiFi hardware.",
      technologies: ["CodeIgniter", "MySQL", "Arduino"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dnachavez/iotparkingsystem",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/uspf-iot-parking-system.png",
      video: "",
    },
    {
      title: "Lyons Global LMS",
      href: "https://lms.lyonsglobal.us",
      dates: "November 2023",
      active: true,
      description:
        "The project is a complete redesign of Lyons Global™'s learning management system using WordPress. It supports various types of content delivery, including interactive modules, document-based resources, and video learning. A user registration and course access approval was added as well.",
      technologies: ["WordPress"],
      links: [
        {
          type: "Website",
          href: "https://lms.lyonsglobal.us",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/lyons-global-lms.png",
      video: "",
    },
    {
      title: "Philippine Scripts Translator",
      href: "https://philippine-scripts-translator.netlify.app",
      dates: "November 2023",
      active: true,
      description:
        "Philippine Scripts Translator is a tool to translate modern Filipino texts into ancient Philippine scripts that are included in the unicode charts. The project is inspired by jennayey's Philippine Script Translator and uses Next.js for its front-end framework.",
      technologies: ["Next.js"],
      links: [
        {
          type: "Website",
          href: "https://philippine-scripts-translator.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dnachavez/philippine-scripts-translator",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/philippine-scripts-translator.png",
      video: "",
    },
    {
      title: "GTranslate",
      href: "https://gtranslation.netlify.app",
      dates: "August 2023",
      active: true,
      description:
        "GTranslate is a translation tool that supports several languages from Google Translate. The project uses Next.js for its front-end framework and the Google Translate API from Pawan.Krd for its back-end.",
      technologies: ["Next.js"],
      links: [
        {
          type: "Website",
          href: "https://gtranslation.netlify.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dnachavez/nextjs-gtranslation-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/gtranslate.png",
      video: "",
    },
    {
      title: "Buddy",
      href: "",
      dates: "June 2023",
      active: true,
      description:
        "It understands and responds to a wide range of inquiries using OpenAI's GPT-3.5-turbo model, DALL-E image generation, and custom commands to provide users with quick and easy access to a university-curated knowledgebase.",
      technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
      links: [],
      image: "/projects/uspf-buddy.png",
      video: "",
    },
    {
      title: "AuggieGPT",
      href: "https://auggiegpt.streamlit.app",
      dates: "February 2023",
      active: true,
      description:
        "A proposed Streamlit chatbot assistant for the University of Southern Philippines Foundation (USPF) built using Python and OpenAI's GPT-3.5-turbo model. It is capable of understanding and responding to specific queries related to the university.",
      technologies: ["Python", "OpenAI", "Streamlit"],
      links: [
        {
          type: "Website",
          href: "https://auggiegpt.streamlit.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dnachavez/AuggieGPT",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/auggie-gpt.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "USPF CCS Days 2025",
      dates: "March 14th, 2025",
      location: "Cebu City, PH",
      description:
        "Developed TESTify, an AI exam proctoring system with facial and behavioral analysis for Canvas LMS using Python, OpenAI, and OpenCV at the USPF CCS Days 2025.",
      image: "/hackathons/uspf.png",
      mlh: "",
      win: "Hackathon Champion / Best Innovative Solution",
      links: [],
    },
    {
      title: "USPF CCS Days 2023",
      dates: "December 9th, 2023",
      location: "Cebu City, PH",
      description:
        "Developed CERTify, an AI-integrated academic record authentication system, at the USPF CCS Days 2023.",
      image: "/hackathons/uspf.png",
      mlh: "",
      win: "Hackathon Champion / Most Promising Innovation / Best in Logo",
      links: [],
    },
    {
      title: "TCS Empowers goIT",
      dates: "November 8th - 12th, 2023",
      location: "Cebu City, PH",
      description:
        "Led a team of three senior high school students in developing TrackTrace, a COVID-19 digital contact tracing application.",
      image: "/hackathons/tcs-empowers.png",
      mlh: "",
      win: "3rd Place",
      links: [],
    },
  ],
} as const;
