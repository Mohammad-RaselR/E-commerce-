import React from "react";

const Filter = () => {
  return (
    <div className=" bg-[#f4f4f4] px-45 py-2 border-gray-200 p-2 flex items-center gap-5 font-semibold">
      {/* Filter Label */}
      <span className="text-sm font-semibold">Filter</span>

      {/* Show Textbox */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Show</span>
        <input
          type="number"
          min="1"
          className="w-16 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="5"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Sorted</span>
        <select className="text-sm border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="default">Default</option>
          <option value="low-to-high">Price Low to High</option>
          <option value="high-to-low">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
