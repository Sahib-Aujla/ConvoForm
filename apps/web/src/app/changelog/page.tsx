import type { Metadata } from "next";

import BrandName from "@/components/common/brandName";
import { TimeLine, TimelineItem } from "@/components/common/timeline";
import { changelog } from "@/lib/data/changelog";
import { formatDate } from "@/lib/utils";
import { changeLogSchema } from "@/lib/validations/changeLog";
import { Button } from "@convoform/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@convoform/ui/components/ui/card";
import { Dot } from "lucide-react";
import Link from "next/link";
import { ReleaseCard } from "./_components/releaseCard";

export const metadata: Metadata = {
  title: "Changelog",
};

const firstCommitLink =
  "https://github.com/growupanand/ConvoForm/commit/386b516dc3f86c32113c114592cc22dca7f549c8";

export default function Page() {
  const changeLogValidation = changeLogSchema.safeParse(changelog);
  const changeLogs = changeLogValidation.success
    ? changeLogValidation.data
    : [];
  const removedEmptyReleases = changeLogs.filter(
    (release) =>
      release.commits.features.length > 0 ||
      release.commits.improvements.length > 0 ||
      release.commits.fixes.length > 0,
  );

  return (
    <div>
      <div className="w-full border-b shadow-sm backdrop-blur-lg">
        <div className="  w-full  p-3 lg:container ">
          <BrandName className="text-xl lg:text-2xl" />
        </div>
      </div>
      <main className="lg:container pb-14">
        <div className="my-4 lg:my-12">
          <h1 className="text-xl font-bold lg:text-3xl  text-center bg-background py-2 lg:py-5 ">
            Changelog
          </h1>
          <p className="text-lg lg:text-2xl text-muted-foreground text-center lg:mb-5">
            Product updates and new features
          </p>
        </div>
        <div className="mx-auto grid ">
          <TimeLine>
            <TimelineItem timelineTitle="">
              <div className="flex items-center py-6 max-lg:justify-center">
                <Button asChild variant="default" size="lg">
                  <Link
                    target="_blank"
                    href="https://convoform.canny.io/feature-requests"
                  >
                    Request new feature
                  </Link>
                </Button>
              </div>
            </TimelineItem>
            {removedEmptyReleases.map((release) => (
              <TimelineItem
                key={release.title}
                timelineTitle={formatDate(release.isoDate)}
              >
                <ReleaseCard release={release} />
              </TimelineItem>
            ))}
            <TimelineItem timelineTitle={formatDate("2023-11-23")}>
              <Card>
                <CardHeader className="font-bold text-xl">Let's Go!</CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="">
                      <Dot className="size-4" />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="capitalize"
                      asChild
                    >
                      <Link
                        href={firstCommitLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        First commit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TimelineItem>
          </TimeLine>
        </div>
      </main>
    </div>
  );
}
