"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TEMPLATE } from "@/dashboard/_component/TemplateListSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { LoaderIcon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  useFormInput: any;
  loading: boolean;
}

const FormSection = ({ selectedTemplate, useFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<any>();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    useFormInput(formData);
  };
  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      {/* @ts-ignore */}

      {selectedTemplate?.icon ? (
        <Image src={selectedTemplate?.icon} alt="icon" height={70} width={60} />
      ) : null}

      <h2 className="font-bold text-2xl mb-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-sm text-gray-500">{selectedTemplate?.desc}</p>
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item: any, index: number) => (
          <div className="my-2 flex flex-col gap-2 mb-7" key={index}>
            <label className="font-bold">{item?.label}</label>
            {item.field == "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field == "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            ) : null}
          </div>
        ))}
        <Button disabled={loading} type="submit" className="w-full py-6 ">
          {loading && <LoaderIcon className="animate-spin" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
