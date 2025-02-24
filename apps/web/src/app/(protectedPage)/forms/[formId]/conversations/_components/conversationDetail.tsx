import type { Conversation, Transcript } from "@convoform/db/src/schema";
import { Badge } from "@convoform/ui/components/ui/badge";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@convoform/ui/components/ui/card";
import { Skeleton } from "@convoform/ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@convoform/ui/components/ui/table";
import { FileText } from "lucide-react";

import { getConversationTableData } from "@/components/queryComponents/table/utils";
import { timeAgo } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@convoform/ui/components/ui/tooltip";
import TranscriptCard from "./transcriptCard";

type Props = {
  conversation: Conversation;
};

export default function ConversationDetail({ conversation }: Readonly<Props>) {
  const tableData = getConversationTableData(conversation.collectedData);
  const tableColumns = Object.keys(tableData);
  const isFormDataEmpty = tableColumns.length === 0;
  const transcript: Transcript[] = conversation.transcript ?? [];

  const getStatusBadge = () => {
    if (conversation.isFinished) {
      return (
        <Badge variant="customSuccess" className="text-sm">
          Finished
        </Badge>
      );
    }

    if (conversation.isInProgress) {
      return (
        <Badge
          variant="customWarning"
          className="flex items-center gap-3 text-sm "
        >
          <span className="bg-yellow-700 flex size-3 animate-pulse rounded-full" />
          <span>In progress</span>
        </Badge>
      );
    }

    return (
      <Badge variant="customDanger" className="text-sm ">
        Not completed
      </Badge>
    );
  };

  return (
    <div className="h-full">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <FileText className=" " size={32} />
            <div className="flex flex-col items-start ">
              <CardTitle className=" font-normal capitalize ">
                {conversation.name}
              </CardTitle>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-xl font-normal">
                {timeAgo(conversation.createdAt)}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              {conversation.createdAt.toLocaleString()}
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-10 flex"> {getStatusBadge()}</div>
        <div className="grid  gap-10 grid-cols-5">
          <div className="col-span-2">
            <div>
              <h2 className="font-montserrat text-muted-foreground mb-2 text-xl">
                Collected data
              </h2>
              {!isFormDataEmpty && (
                <div className="overflow-hidden rounded-md border bg-white">
                  <Table className="">
                    <TableBody>
                      {tableColumns.map((columnName, index) => {
                        return (
                          <TableRow
                            key={`${index}-${conversation.id}-${columnName}`}
                          >
                            <TableCell className="py-2">{columnName}</TableCell>
                            <TableCell className="py-2 font-medium">
                              {tableData[columnName]}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3">
            <h2 className="font-montserrat text-muted-foreground mb-2 text-xl">
              Transcript
            </h2>
            <TranscriptCard
              isBusy={conversation.isInProgress}
              transcript={transcript}
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
}

const ConversationDetailSkeleton = () => {
  return (
    <div className="h-full">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <FileText className=" " size={32} />
            <div className="flex flex-col items-start ">
              <CardTitle className=" font-normal capitalize ">
                <Skeleton className="h-4 w-40" />
              </CardTitle>
            </div>
          </div>
          <div className="text-xl font-normal">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-10 flex">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="grid  gap-10 grid-cols-5">
          <div className="col-span-2">
            <div>
              <h2 className="font-montserrat text-muted-foreground mb-2 text-xl">
                Collected data
              </h2>
              <div className="overflow-hidden rounded-md border bg-white">
                <Table className="">
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-2">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="py-2 font-medium">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <h2 className="font-montserrat text-muted-foreground mb-2 text-xl">
              Transcript
            </h2>
            <TranscriptCard.Skeleton />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

ConversationDetail.ConversationDetailSkeleton = ConversationDetailSkeleton;
