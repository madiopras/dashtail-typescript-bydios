import { Skeleton } from "@/components/ui/skeleton";

import {
    Card,
    CardContent,
  } from "@/components/ui/card";


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Card>
        <CardContent className="p-0">
        <div className="p-1">
            <Skeleton className="w-full h-12" />
          </div>
          <div className="p-1 w-full h-[191px] overflow-hidden rounded-t-md">
            <Skeleton className="w-full h-full" />
          </div>
        </CardContent>
        
      </Card>
    )
  }