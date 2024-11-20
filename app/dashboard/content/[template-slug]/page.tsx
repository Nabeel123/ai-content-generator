"use client";
import React, { use, useEffect, useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "@/dashboard/_component/TemplateListSection";
import Templates from "@/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface Props {
  params: Promise<{
    "template-slug": string;
  }>;
}

function CreateNewContent({ params }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<
    TEMPLATE | undefined
  >(undefined);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      const template = Templates?.find(
        (item) => item.slug === resolvedParams["template-slug"]
      );
      setSelectedTemplate(template);
    };
    unwrapParams();
  }, [params]);

  const GenerateAIContent = (formData: any) => {
    console.log("Generated content:", formData);
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
          useFormInput={(v: any) => console.log("v", v)}
        />
        <div className="col-span-2">
          <OutputSection />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
