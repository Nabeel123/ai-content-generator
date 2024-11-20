import React from "react";
import Templates from "@/(data)/Templates";
import TemplateCard from "./TemplateCard";

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}
export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

function TemplateListSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {Templates.map((item: TEMPLATE, index: number) => (
        <div key={index}>
          <TemplateCard {...item} />
        </div>
      ))}
    </div>
  );
}

export default TemplateListSection;
