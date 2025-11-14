import { CertificationCard } from "@/components/certification-card";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectItem } from "@/components/project-item";
import { ResumeCard } from "@/components/resume-card";
import { SectionNav } from "@/components/section-nav";
import { ThemeAvatar } from "@/components/theme-avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { getProjectSortDate } from "@/lib/date-utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

const SECTIONS = [
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Page() {
  const sortedProjects = [...DATA.projects].sort((a, b) => {
    return getProjectSortDate(b.dates) - getProjectSortDate(a.dates);
  });

  const sortedCertifications = [...DATA.certifications].sort((a, b) => {
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.dates) - getYear(a.dates);
  });

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-10 lg:sticky lg:top-10 lg:self-start">
          <section id="hero">
            <div className="space-y-8">
              <div className="gap-2 flex justify-between">
                <div className="flex-col flex flex-1 space-y-1.5">
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    yOffset={8}
                    text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
                  />
                  <BlurFadeText
                    className="max-w-[600px] md:text-xl"
                    delay={BLUR_FADE_DELAY}
                    text={DATA.description}
                  />
                </div>
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <ThemeAvatar
                    name={DATA.name}
                    initials={DATA.initials}
                    className="size-28 border"
                  />
                </BlurFade>
              </div>
            </div>
          </section>

          <section id="about">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </BlurFade>
          </section>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="hidden lg:block">
              <SectionNav sections={SECTIONS} />
            </div>
          </BlurFade>
        </div>

        <div className="space-y-10">
          <section id="resume">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="text-xl font-bold">Resume</h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-lg border bg-card">
                    <div className="relative h-[500px] w-full">
                      <iframe
                        src="/resume.pdf"
                        className="w-full h-full pointer-events-none"
                        title="Resume Preview"
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[65%] backdrop-blur-xl"
                        style={{
                          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 45%, black 70%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 45%, black 70%)',
                        }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-transparent from-0% via-background/50 via-40% to-background to-90%"
                      />
                    </div>
                  </div>
                  
                  <Link
                    href="/resume.pdf"
                    download="Dan_Chavez_Resume.pdf"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline active:underline transition-colors mt-4"
                  >
                    View full resume archive
                    <ChevronRightIcon className="size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </BlurFade>
            </div>
          </section>

          <section id="work">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 6}>
                <h2 className="text-xl font-bold">Work Experience</h2>
              </BlurFade>
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 7 + id * 0.05}
                >
                  <ResumeCard
                    key={work.company}
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-xl font-bold">Education</h2>
              </BlurFade>
              {DATA.education.map((education, id) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="skills">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-xl font-bold">Skills</h2>
              </BlurFade>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DATA.skills.map((skillCategory, id) => (
                  <BlurFade
                    key={skillCategory.category}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                    <ResumeCard
                      logoUrl={skillCategory.logoUrl}
                      altText={skillCategory.category}
                      title={skillCategory.category}
                      subtitle={skillCategory.skills.join(", ")}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>

          <section id="projects">
            <div className="space-y-8 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                      My Projects
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">
                      Check out my latest work
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      I&apos;ve worked on a variety of projects, from simple
                      websites to complex web applications. Here are a few of my
                      favorites.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <div className="flex flex-col gap-4">
                {sortedProjects.slice(0, 4).map((project, id) => (
                  <BlurFade
                    key={project.title}
                    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                  >
                    <ProjectItem
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </div>
              {DATA.projects.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 12 + 0.1}>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline active:underline transition-colors"
                  >
                    View full project archive
                    <ChevronRightIcon className="size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="hackathons">
            <div className="space-y-12 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 13}>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                      Hackathons
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">
                      I like building things
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      During my time in university, I attended{" "}
                      {DATA.hackathons.length}+ hackathons. People from around
                      the country would come together and build incredible
                      things in 2-3 days. It was eye-opening to see the endless
                      possibilities brought to life by a group of motivated and
                      passionate individuals.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 14}>
                <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                  {DATA.hackathons.slice(0, 4).map((project, id) => (
                    <BlurFade
                      key={project.title + project.dates}
                      delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                    >
                      <HackathonCard
                        title={project.title}
                        description={project.description}
                        location={project.location}
                        dates={project.dates}
                        image={project.image}
                        win={"win" in project ? project.win : undefined}
                        links={project.links}
                      />
                    </BlurFade>
                  ))}
                </ul>
              </BlurFade>
              {DATA.hackathons.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 14 + 0.1}>
                  <Link
                    href="/hackathons"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline active:underline transition-colors"
                  >
                    View full hackathon archive
                    <ChevronRightIcon className="size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="certifications">
            <div className="space-y-8 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                      Certifications
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">
                      Professional credentials
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      I continuously invest in professional development to stay
                      current with industry best practices and emerging
                      technologies. These certifications validate my expertise
                      and commitment to excellence.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <div className="flex flex-col gap-4">
                {sortedCertifications.slice(0, 4).map((cert, id) => (
                  <BlurFade
                    key={cert.title}
                    delay={BLUR_FADE_DELAY * 17 + id * 0.05}
                  >
                    <CertificationCard
                      href={cert.href}
                      title={cert.title}
                      description={cert.description}
                      dates={cert.dates}
                      image={cert.image}
                    />
                  </BlurFade>
                ))}
              </div>
              {DATA.certifications.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 17 + 0.1}>
                  <Link
                    href="/certifications"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline active:underline transition-colors"
                  >
                    View full certifications archive
                    <ChevronRightIcon className="size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="contact">
            <div className="gap-4 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 18}>
                <div className="space-y-3">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Contact
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Want to chat? Just shoot me an email at{" "}
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {DATA.contact.email}
                    </Link>{" "}
                    and I&apos;ll respond whenever I can. I will ignore all
                    soliciting.
                  </p>
                </div>
              </BlurFade>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
