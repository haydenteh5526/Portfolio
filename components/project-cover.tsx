import Image from "next/image";
import { asset, type Project } from "@/lib/site";

export function ProjectCover({
  screenshot,
  featured = false,
}: {
  screenshot: Project["screenshot"];
  featured?: boolean;
}) {
  const { secondary } = screenshot;

  return (
    <div className="project-cover" data-layout={screenshot.layout}>
      <div className="project-cover-composition">
        <div className="project-cover-screen project-cover-secondary">
          <Image
            src={asset(`projects/${secondary.file}`)}
            width={secondary.width}
            height={secondary.height}
            alt={featured ? secondary.alt : ""}
          />
        </div>
        <div className="project-cover-screen project-cover-primary">
          <Image
            src={asset(`projects/${screenshot.file}`)}
            width={screenshot.width}
            height={screenshot.height}
            alt={featured ? screenshot.alt : ""}
            priority={featured}
          />
        </div>
      </div>
    </div>
  );
}
