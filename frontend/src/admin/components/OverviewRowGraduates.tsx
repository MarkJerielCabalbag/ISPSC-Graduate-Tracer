import Header from "./Header";
import { useParams } from "react-router-dom";
import { useGetGraduatesPerRow, useGetTotalGraduates } from "../hooks/client";
import { DataTable } from "./table/data-tables";
import { graduatesRowColumnDef } from "./table/columns";
import GraduatesPerRow from "./table/TableHeaders/GraduatesPerRow";
import { Button } from "../../components/ui/button";
import { TotalGraduates } from "../types/types";
import { CirclePlus, Edit3 } from "lucide-react";

const OverviewRowGraduates = () => {
  const { year, program } = useParams();
  const { data, isLoading, isFetching } = useGetGraduatesPerRow(
    year ?? "",
    program ?? ""
  );

  const { data: totalGraduates } = useGetTotalGraduates(
    year ?? "",
    program ?? ""
  );

  console.log(totalGraduates);

  return (
    <div>
      <Header />

      <div className="w-[90%] mx-auto my-5">
        <div className="my-3 flex justify-between items-center bg-primary p-5 rounded-md">
          {totalGraduates?.map((total: TotalGraduates) => (
            <>
              <div key={total.id}>
                <h1 className="main-font">{total.department}</h1>
                <h2 className="text-white font-bold">{total.program}</h2>
              </div>
              <div className="bg-white p-3 rounded-sm">
                <h1 className="text-primary font-bold text-xl text-end">
                  {total.totalGraduates}
                </h1>
                <p className="italic text-end">Total Graduates</p>
                {total.totalGraduates === 0 ? (
                  <Button variant="outline">
                    <CirclePlus /> Add Total Graduates
                  </Button>
                ) : (
                  <Button variant="outline">
                    <Edit3 /> Edit Total Graduates
                  </Button>
                )}
              </div>
            </>
          ))}
        </div>
        {isLoading || isFetching ? (
          <p>loading</p>
        ) : (
          <DataTable
            data={data}
            columns={graduatesRowColumnDef}
            tableHeader={
              <GraduatesPerRow
                year={year as string}
                program={program as string}
              />
            }
            serachFor="Name"
            filterInputName="fullName"
          />
        )}

        <div>
          {totalGraduates?.map((total: TotalGraduates) =>
            total.totalGraduates === 0 ? (
              <>
                <Button>Add Total Graduates</Button>
              </>
            ) : (
              <h1>Advance functionality</h1>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewRowGraduates;
