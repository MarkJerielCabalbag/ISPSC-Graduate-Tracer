import Header from "./Header";
import { useParams } from "react-router-dom";
import { useGetGraduatesPerRow } from "../hooks/client";
import { DataTable } from "./table/data-tables";
import { graduatesRowColumnDef } from "./table/columns";
import GraduatesPerRow from "./table/TableHeaders/GraduatesPerRow";
import { Button } from "../../components/ui/button";

const OverviewRowGraduates = () => {
  const { year, program } = useParams();
  const { data, isLoading, isFetching } = useGetGraduatesPerRow(
    year ?? "",
    program ?? ""
  );

  return (
    <div>
      <Header />

      <div className="w-[90%] mx-auto my-5">
        <div className="my-3">
          <Button>Add total graduates</Button>
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
      </div>
    </div>
  );
};

export default OverviewRowGraduates;
