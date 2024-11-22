"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { db } from "../../../utils/db";
import { AIOutput } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/(context)/UpdatedCreditUsageContext";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState<number>(10000);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && updateCreditUsage) {
      GetData();
    }
  }, [updateCreditUsage]);

  const GetData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
        .execute();

      if (Array.isArray(result)) {
        calculateTotalUsage(result);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const calculateTotalUsage = (result: any) => {
    if (!result || !Array.isArray(result)) return;

    let total: number = 0;
    result.forEach((usage: any) => {
      total += Number(usage.aiResponse?.length || 0);
    });

    // Clamp totalUsage to maxWords
    setTotalUsage(Math.min(total, maxWords));
  };

  const IsUserSubscribe = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log("User email address is not available.");
      return;
    }

    try {
      const result = await db
        .select()
        .from(userSubscription)
        .where(
          eq(userSubscription.email, user.primaryEmailAddress.emailAddress)
        )
        .execute();

      if (result.length > 0) {
        setUserSubscription(true);
        setMaxWords(1000000); // Higher limit for subscribed users
      } else {
        setUserSubscription(false);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  const handleUpgradeClick = () => {
    router.push("/dashboard/billing");
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-slate-200 rounded-full"
            style={{
              width:
                totalUsage >= maxWords
                  ? "100%"
                  : `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage >= maxWords
            ? "Credits finished"
            : `${totalUsage}/${maxWords} credits used`}
        </h2>
      </div>
      <Button
        className="w-full my-3 text-primary bg-purple-600 text-white"
        onClick={handleUpgradeClick}
      >
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
