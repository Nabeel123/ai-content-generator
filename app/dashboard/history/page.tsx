import Templates from "@/(data)/Templates";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import { TEMPLATE } from "../_component/TemplateListSection";
import { AIOutput } from "../../../utils/schema";
import CopyButton from "./_components/CopyButton";
import { db } from "../../../utils/db";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string; // ISO 8601 Date String
}

async function History() {
  const user = await currentUser();

  // Fetching the history list
  const HistoryList: any = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id));

  // Helper function to fetch the template name and icon
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find(
      (item) => item.slug === slug
    );
    return template;
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generated AI content
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>
      {HistoryList.map((item: HISTORY, index: number) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={
                  GetTemplateName(item?.templateSlug)?.icon ||
                  "/default-icon.png"
                }
                width={25}
                height={25}
                alt="icon"
              />
              {GetTemplateName(item.templateSlug)?.name || "Unknown Template"}
            </h2>
            <h2 className="col-span-2 line-clamp-3 mr-3">{item?.aiResponse}</h2>
            <h2>{formatDate(item.createdAt)}</h2>
            <h2>{item?.aiResponse.length}</h2>
            <h2>
              <CopyButton
                className="bg-purple-600"
                aiResponse={item.aiResponse}
              />
            </h2>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default History;
