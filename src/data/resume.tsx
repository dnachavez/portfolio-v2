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
      category: "Frontend Development",
      logoUrl: "/skills/frontend.png",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "Bootstrap",
        "jQuery",
      ],
    },
    {
      category: "Backend Development",
      logoUrl: "/skills/backend.png",
      skills: [
        "PHP",
        "CodeIgniter",
        "Python",
        "Node.js",
        "MySQL",
        "PostgreSQL",
      ],
    },
    {
      category: "Frameworks & Libraries",
      logoUrl: "/skills/frameworks-libraries.png",
      skills: ["Next.js", "React.js", "Astro", "Streamlit"],
    },
    {
      category: "Cloud & Deployment",
      logoUrl: "/skills/cloud-deployment.png",
      skills: [
        "AWS",
        "GCP",
        "Serverless",
        "Netlify",
        "Vercel",
        "Replit",
        "cPanel",
      ],
    },
    {
      category: "AI & Tools",
      logoUrl: "/skills/ai-tools.png",
      skills: [
        "OpenAI",
        "Gemini",
        "Anthropic",
        "LangChain",
        "HuggingFace",
        "Transformers",
        "PyTorch",
        "TensorFlow",
      ],
    },
    {
      category: "Design & CMS",
      logoUrl: "/skills/design-cms.png",
      skills: ["Figma", "Photoshop", "Canva", "WordPress"],
    },
    {
      category: "Development Tools",
      logoUrl: "/skills/development-tools.png",
      skills: ["Git"],
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
      company: "Develop Kreativity",
      href: "https://www.developkreativity.com",
      badges: [],
      location: "Remote",
      title: "Chief Technology Officer",
      logoUrl: "/work-experience/developkreativity.png",
      start: "November 2023",
      end: "December 2025",
      description: "",
    },
    {
      company: "GoTeam",
      badges: [],
      href: "https://go.team",
      location: "Remote",
      title: "AI Specialist",
      logoUrl: "/work-experience/goteam.png",
      start: "June 2025",
      end: "Present",
      description:
        "Built AI agents and automation workflows for internal sales and marketing teams, streamlining lead qualification, data enrichment, and reporting while reducing manual busywork for stakeholders. Integrated multiple internal and third-party systems via secure APIs, token management, and event-driven workflows, eliminating duplicate data entry and improving data consistency across CRM, marketing, and operations tools. Evaluated and piloted emerging AI technologies and low/no-code agent-building platforms to deliver rapid proofs of concept, then hardened successful experiments into production-ready solutions, shortening the cycle from idea to deployed automation. Collaborated with sales, marketing, and leadership to translate business requirements into AI-powered processes, documenting standards, reusable components, and runbooks that laid the groundwork for a scalable internal AI and automation consulting team.",
    },
    {
      company: "Bilis Delivery",
      href: "https://bilisdelivery.com",
      badges: [],
      location: "Remote",
      title: "Lead Full-Stack Engineer",
      logoUrl: "/work-experience/bilis.png",
      start: "April 2024",
      end: "December 2025",
      description:
        "Built a food-delivery platform that processed 10,000+ orders from 2,000+ users in its first year, leveraging Laravel queues and Redis for asynchronous workloads while maintaining 99.9% uptime at peak traffic. Added real-time order tracking and notifications via WebSockets and the Google Maps API, enabling customers to monitor deliveries through push, SMS, in-app, and email alerts. Integrated COD, credit-card, and in-app-wallet payments with secure transactions using Laravel Passport and OTP verification. Created a zone-based driver-matching algorithm that filters drivers by location, vehicle compatibility, and live availability, accelerating driver assignment by 80%. Scaled the backend by optimizing queries, adding indexes, and caching hot data in Redis, significantly reducing page-load times. Employed batch processing, atomic transactions, and efficient upsert operations to handle 100+ concurrent orders during peak hours. Designed a multi-guard authentication scheme with Laravel Passport and custom session-based guards for customers, drivers, vendors, and admins. Implemented granular, module-level RBAC, with roles and permissions defined through JSON-configured modules in the database. Structured the backend as a modular monolith using service interfaces and the nwidart/laravel-modules package to encapsulate business logic.",
    },
    {
      company: "University of Southern Philippines Foundation",
      href: "https://uspf.edu.ph",
      badges: [],
      location: "Cebu City, PH",
      title: "Full-Stack Developer",
      logoUrl: "/work-experience/uspf.png",
      start: "June 2023",
      end: "July 2026",
      description:
        "Developed a multi-agent AI chat system using a state-graph pipeline that delivers automated, context-aware responses, achieving 85% query-resolution accuracy and reducing support requests by 40%. Built a university app that boosted service access by 35% by integrating digital ID/RFID tracking, statement-of-account retrieval from Pinnacle, and online payments through UnionBank and MLhuillier. Reduced average wait times at university service offices by 80% by developing a queuing management system that replaced manual queues. Upgraded a PowerEdge R440 server and locally deployed a document-records management system, eliminating manual storage and sharing and improving inter-departmental workflow by 60%.",
    },
    {
      company: "xFusion",
      href: "https://xfusion.io",
      badges: [],
      location: "Remote",
      title: "Full-Stack / AI Engineer",
      logoUrl: "/work-experience/xfusion.png",
      start: "August 2024",
      end: "March 2025",
      description:
        "Developed a multi-agent AI responder system that generates contextual replies from multiple sources, boosting response accuracy by 65% and reducing drafting time by 75%. Implemented prompt engineering, evaluation metrics, and agentic decision logic improving AI agent performance. Built an AI-powered inbox with a responder agent that filters low-priority messages across platforms, reducing management time by 40% by enabling users to handle all communications in one place. Re-architected the serverless stack to auto-scale with concurrent, queue-based processing, enabling it to handle 3x the original request volume. Optimized serverless code execution, resource allocation and third-party calls, cutting infrastructure costs by 20%. Integrated an AI agent with Linear's API to automate 80% of task management, reducing manual workload by 30% and raising ticket resolution speed and customer satisfaction by 25%. Developed parallel ETL pipelines that support batch and concurrent processing of emails, messages, and transcripts. Optimized data flow to minimize errors and prevent data loss, boosting AI-agent performance and reliability by 45%. Mentored junior developers through onboarding, task guidance, and ongoing support, reducing bugs by 35%. Introduced and leveraged AI development tools to accelerate individual and team productivity, enabling faster task completion and higher daily progress. Prototyped an automated customer-onboarding system that tracked progress and engaged customers through CSM accounts by sending weekly checkpoints and follow-ups. Helped lay the foundation for the company's no-code AI workflow builder, enabling non-technical users to create custom automations and agents through a visual, node-based interface.",
    },
    {
      company: "MyToolz.net",
      href: "https://mytoolz.net",
      badges: [],
      location: "Remote",
      title: "Back-End Developer",
      logoUrl: "/work-experience/mytoolz.png",
      start: "July 2021",
      end: "December 2021",
      description:
        "Improved a high-traffic Blogger-based link locker by using an externally hosted API endpoint to securely handle URL masking using server-side encryption and database ID mapping, replacing insecure client-side base64 masking. Integrated strict referrer validation to ensure only legitimate requests from the Blogger site could access protected content, resulting in a 70% reduction in content theft. Developed a PHP-based API toolkit as a collection of custom tools, including proxy validation (via cURL and provider APIs), email validation and filtering with regex, cryptocurrency balance checks, and account verification. Migrated core validation and utility features from third-party APIs to in-house solutions, reducing external API calls by 40% and improving system reliability.",
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
