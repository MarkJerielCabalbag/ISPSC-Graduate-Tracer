import { Suspense } from "react";
import { useGetSummaryData } from "../../hooks/client";
import { columns } from "./columns";
import { DataTable } from "./data-tables";

const DemoPage = () => {
  const { data, isFetching } = useGetSummaryData();

  return (
    <Suspense>
      <div className="container mx-auto py-10">
        {isFetching ? (
          <p>loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </Suspense>
  );
};

export default DemoPage;
