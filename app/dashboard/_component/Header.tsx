import { Search } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <div className="p-4 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex gap-2 items-center p-2 rounded-md max-w-lg ">
        <Search />
        <input type="text" placeholder="Search ..." className="outline-none " />
      </div>
      <div className="bg-purple-500 p-1 rounded-full text-xs text-white px-2">
        <h2> 🔥 Join membership just for $9.99</h2>
      </div>
    </div>
  );
};
