"use client";

import React, { use, useEffect, useState } from "react";
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

export interface Props {
  params: Promise<{
    "template-slug": string;
  }>;
}

function CreateNewContent({ params }: Props) {
  const resolvedParams = use(params); // Unwrap the `params` Promise using `React.use`
  const { user, isLoaded } = useUser(); // Ensure Clerk's hook is used properly
  const [selectedTemplate, setSelectedTemplate] = useState<
    TEMPLATE | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string | undefined>();

  useEffect(() => {
    const template = Templates?.find(
      (item) => item.slug === resolvedParams["template-slug"]
    );
    setSelectedTemplate(template);
  }, [resolvedParams]);

  const GenerateAIContent = async (formData: any) => {
    if (!isLoaded) {
      console.error("User data is not loaded yet.");
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

      // Simulating AI generation logic
      console.log("Sending prompt to AI:", finalPrompt);
      const aiResponse = "Simulated AI Response";

      setAIOutput(aiResponse);
      await saveInDB(
        JSON.stringify(formData),
        selectedTemplate?.slug,
        aiResponse
      );
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
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
        formData,
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
