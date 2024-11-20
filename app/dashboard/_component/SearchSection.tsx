import { Search } from "lucide-react";
import React from "react";

function SearchSection() {
  return (
    <div className="p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-500 flex justify-center flex-col items-center">
      <h2 className=" text-white text-3xl font-bold">Browse all Templates</h2>
      <p className="text-white my-2">What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-4 w-[60%]">
          <Search className="text-primary" />
          <input
            type="text"
            className="bg-transparent text-black outline-none w-full"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
