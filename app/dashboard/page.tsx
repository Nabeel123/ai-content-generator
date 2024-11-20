"use client";
import React, { useState } from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <div className="bg-slate-200">
      {/* Search Section */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />
      {/* Template List section */}
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
