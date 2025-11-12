import { DATA } from "@/data/resume";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function HackathonsPage() {
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
          All Hackathons
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
                Hackathon
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Location
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {DATA.hackathons.map((hackathon, index) => {
              const year =
                hackathon.dates.split(" - ")[1] ||
                hackathon.dates.split(" - ")[0];
              const extractedYear = year.match(/\d{4}/)?.[0] || year;

              return (
                <tr key={index} className="group">
                  <td className="py-4 px-2 text-sm text-muted-foreground whitespace-nowrap align-top">
                    {extractedYear}
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-sm">
                        {hackathon.title}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {hackathon.description}
                      </p>
                      {"win" in hackathon && hackathon.win && (
                        <p className="text-xs font-medium text-primary">
                          🏆 {hackathon.win}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="text-sm text-muted-foreground">
                      {hackathon.location}
                    </div>
                  </td>
                  <td className="py-4 px-2 align-top">
                    {hackathon.links &&
                      Array.isArray(hackathon.links) &&
                      hackathon.links.length > 0 && (
                        <div className="flex gap-2">
                          {hackathon.links.map((link: any, idx: number) => (
                            <Link
                              key={idx}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title={link.title}
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
