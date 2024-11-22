"use client";
import { Button } from "@/components/ui/button";
import React from "react";

function CopyButton({ aiResponse }: any) {
  return (
    <div>
      <Button
        className="text-white bg-indigo-500"
        onClick={() => navigator.clipboard.writeText(aiResponse)}
      >
        Copy
      </Button>
    </div>
  );
}

export default CopyButton;
