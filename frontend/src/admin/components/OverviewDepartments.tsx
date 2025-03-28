import { useParams } from "react-router-dom";
import { useGetDepartmentDetails } from "../hooks/client";
import Header from "./Header";
import { DepartmentDetails, Major } from "../types/types";
import { ArrowLeft } from "lucide-react";

const OverviewDepartments = () => {
  const { departmentId } = useParams();
  const { data, isLoading, isFetching } = useGetDepartmentDetails(
    departmentId ?? ""
  );
  console.log(data);
  return (
    <div>
      <Header />
      <div className="w-[90%] mx-auto">
        {isLoading || isFetching ? (
          <div>loading</div>
        ) : (
          <>
            <h1 className="text-lg text-primary font-bold my-5 flex gap-2 items-center">
              <ArrowLeft /> Programs
            </h1>
            <div className="grid grid-cols-3 gap-3">
              {data.map((department: DepartmentDetails) => (
                <div
                  key={department.program}
                  className="p-5 bg-primary rounded-md"
                >
                  <div className="main-font mb-5">{department.program}</div>
                  <p className="italic text-white text-md">List of Majors</p>

                  {department?.listOfMajor?.map((major: Major) => (
                    <div key={major.id}>
                      <p className="text-sm italic text-white opacity-75">
                        {major.major}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewDepartments;
