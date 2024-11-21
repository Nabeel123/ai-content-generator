"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/db";
import { AIOutput } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { HISTORY } from "../history/page";

function UsageTrack() {
  // Usage tracking logic here
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState<number>(0);

  useEffect(() => {
    user && GetData();
  }, [user]);

  const GetData = async () => {
    const result: any = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    getTotalUsage(result);
  };
  const getTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((usage) => {
      total += Number(usage.aiResponse?.length);
    });
    console.log("ttt", total);
    setTotalUsage(total);
  };
  console.log("tota", totalUsage);

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: (totalUsage / 10000) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className="text-sm my-3">{totalUsage} / 10,000 Credits Used</h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
