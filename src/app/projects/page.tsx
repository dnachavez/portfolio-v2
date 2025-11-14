import { DATA } from "@/data/resume";
import { getProjectSortDate } from "@/lib/date-utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const sortedProjects = [...DATA.projects].sort((a, b) => {
    return getProjectSortDate(b.dates) - getProjectSortDate(a.dates);
  });
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <div className="space-y-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:-translate-x-1" />
          Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          All Projects
        </h1>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <colgroup>
            <col className="w-[80px]" />
            <col className="w-[35%]" />
            <col className="w-[35%]" />
            <col className="w-[80px]" />
          </colgroup>
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Year
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Project
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Built with
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedProjects.map((project, index) => {
              const year =
                project.dates.split(" - ")[1] || project.dates.split(" - ")[0];
              const extractedYear = year.match(/\d{4}/)?.[0] || year;

              return (
                <tr key={index} className="group">
                  <td className="py-4 px-2 text-sm text-muted-foreground whitespace-nowrap align-top">
                    {extractedYear}
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="flex flex-col gap-1">
                      <Link
                        href={project.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-sm hover:text-primary transition-colors"
                      >
                        {project.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[10px] px-2 py-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-2 align-top">
                    {project.links && project.links.length > 0 && (
                      <div className="flex gap-2">
                        {project.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title={link.type}
                          >
                            {link.icon}
                          </Link>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
