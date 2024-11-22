"use client";

import React, { use, useEffect, useState, useContext } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "@/dashboard/_component/TemplateListSection";
import Templates from "@/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../utils/db";
import { AIOutput } from "../../../../utils/schema";
import { TotalUsageContext } from "@/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/(context)/UpdatedCreditUsageContext";
import { chatSession } from "../../../../utils/AIModal";

export interface Props {
  params: Promise<{
    "template-slug": string;
  }>;
}

function CreateNewContent(props: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<
    TEMPLATE | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  useEffect(() => {
    // Unwrapping the `params` promise
    props.params.then((unwrappedParams) => {
      const templateSlug = unwrappedParams["template-slug"];
      const template = Templates?.find((item) => item.slug === templateSlug);
      setSelectedTemplate(template);
    });
  }, [props.params]);

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      console.log("Please Upgrade");
      router.push("/dashboard/billing");
      return;
    }
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      setLoading(true);
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalPrompt = JSON.stringify(formData) + " , " + selectedPrompt;
      const result = await chatSession.sendMessage(finalPrompt);

      setAiOutput(result?.response.text());
      await saveInDB(
        JSON.stringify(formData),
        selectedTemplate?.slug,
        result?.response.text()
      );
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setUpdateCreditUsage(Date.now());
      setLoading(false);
    }
  };

  const saveInDB = async (formData: any, slug: any, aiResp: string) => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email is not available.");
        return;
      }

      await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: new Date(),
      });

      console.log("Saved to DB successfully");
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          useFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
