"use client";
import React from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "@/dashboard/_component/TemplateListSection";
import Templates from "@/(data)/Templates";
import { Button } from "@/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface Props {
  params: {
    "template-slug": string;
  };
}
function CreateNewContent(props: Props) {
  const GenerateAIContent = (formData: any) => {};

  const selectedTemplate: TEMPLATE | undefined = Templates.find(
    (item) => item.slug == props.params["template-slug"]
  );
  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
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
      </Link>
    </div>
  );
}

export default CreateNewContent;
