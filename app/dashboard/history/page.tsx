import React from "react";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdAt: Date;
  createdByAuthor: string;
}
async function HistoryPage() {
  return <div>HistoryPage</div>;
}

export default HistoryPage;
