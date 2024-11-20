import React from "react";
import SearchSection from "./_component/SearchSection";
import TemplateListSection from "./_component/TemplateListSection";

function Dashboard() {
  return (
    <div>
      {/* Search Section */}
      <SearchSection />
      {/* Template List section */}
      <TemplateListSection />
    </div>
  );
}

export default Dashboard;
