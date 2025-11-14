import { DATA } from "@/data/resume";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function CertificationsPage() {
  const sortedCertifications = [...DATA.certifications].sort((a, b) => {
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.dates) - getYear(a.dates);
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
          All Certifications
        </h1>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <colgroup>
            <col className="w-[80px]" />
            <col className="w-[50%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Year
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Certification
              </th>
              <th className="text-left py-3 px-2 font-semibold text-sm">
                Issuer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedCertifications.map((cert, index) => {
              const extractedYear =
                cert.dates.match(/\d{4}/)?.[0] || cert.dates;

              return (
                <tr key={index} className="group">
                  <td className="py-4 px-2 text-sm text-muted-foreground whitespace-nowrap align-top">
                    {extractedYear}
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="flex flex-col gap-1">
                      {cert.href ? (
                        <Link
                          href={cert.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sm hover:text-primary transition-colors"
                        >
                          {cert.title}
                        </Link>
                      ) : (
                        <div className="font-semibold text-sm">
                          {cert.title}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2 align-top">
                    <div className="text-sm text-muted-foreground">
                      {cert.description}
                    </div>
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
