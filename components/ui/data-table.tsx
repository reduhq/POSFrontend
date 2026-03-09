"use client";

import React from "react";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  className?: string; // For setting flex widths, e.g. w-48 or flex-1
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  isLoading = false,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 flex justify-center items-center">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="material-symbols-outlined animate-spin">refresh</span>
          <span className="font-medium text-sm">Loading records...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-center">
        <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <span className="material-symbols-outlined text-3xl">inbox</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No records found</h3>
        <p className="text-sm text-slate-500 max-w-sm">There is no data to display right now. Try adjusting your filters or adding a new record.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              {/* Optional Checkbox Column for bulk actions could go here */}
              <th className="px-6 py-4 w-12 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider sticky left-0 z-10 bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-r border-slate-100 dark:border-slate-700/50">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
              </th>
              {columns.map((col, idx) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.className || ""}`}
                >
                  <div className="flex items-center gap-2 group cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                    {col.header}
                    <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick && onRowClick(item)}
                className={`group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
              >
                <td className="px-6 py-4 text-center sticky left-0 z-10 bg-white group-hover:bg-slate-50/80 dark:bg-slate-900 dark:group-hover:bg-slate-800/30 transition-colors border-r border-slate-100 dark:border-slate-800">
                   <input type="checkbox" onClick={(e) => e.stopPropagation()} className="rounded border-slate-300 text-primary focus:ring-primary" />
                </td>
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-6 py-4 text-sm text-slate-700 dark:text-slate-300 ${col.className || ""}`}
                  >
                    {col.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Salesforce style table footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <div>
          Showing {data.length} items
        </div>
      </div>
    </div>
  );
}
