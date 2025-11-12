import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  image?: string;
  video?: string;
  className?: string;
}

export function CertificationCard({
  title,
  href,
  description,
  dates,
  image,
  video,
  className,
}: Props) {
  return (
    <div className={cn("group -mx-2 px-2 py-2", className)}>
      <div className="flex items-start gap-6">
        {/* Thumbnail on the left */}
        <a
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-32 h-24 overflow-hidden rounded-md block no-underline"
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {image && !video && (
            <Image
              src={image}
              alt={title}
              width={128}
              height={96}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </a>

        {/* Certification details on the right */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div>
              <a
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <h3 className="inline-flex items-center text-lg leading-none font-semibold group-hover:text-primary transition-colors">
                  {title}
                  <ChevronRightIcon className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 ml-1" />
                </h3>
              </a>
              <time className="block text-xs text-muted-foreground">
                {dates}
              </time>
            </div>

            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert line-clamp-2">
              {description}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
