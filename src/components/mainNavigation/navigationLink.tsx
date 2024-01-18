import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isActive?: boolean;
  href: string;
  name: string;
};

const NavigationLink = ({ isActive, href, name }: Props) => {
  return (
    <Link href={href}>
      <Button
        variant="link"
        className={cn(
          "w-full justify-start py-0 text-base font-normal text-gray-500 hover:font-medium hover:text-gray-900 hover:no-underline ",
          isActive && "font-medium text-gray-900",
        )}
      >
        {name}
      </Button>
    </Link>
  );
};

const AppNavBarLinkSkeleton = () => {
  return (
    <Button variant="link" className="w-full justify-start py-0">
      <Skeleton className="h-2 w-20 bg-gray-300" />
    </Button>
  );
};

NavigationLink.Skeleton = AppNavBarLinkSkeleton;

export default NavigationLink;