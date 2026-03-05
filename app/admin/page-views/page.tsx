"use client";

import { useFetchPageViews } from "@/app/hooks/usePageViews";
import { DataTable } from "@/components/admin/DataTable";
import { pageViewColumns } from "./columns";

const PageViewsPage = () => {
  const { data, isLoading } = useFetchPageViews();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Page Views</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading page views...</p>
      ) : (
        <DataTable data={data ?? []} columns={pageViewColumns} />
      )}
    </div>
  );
};

export default PageViewsPage;
