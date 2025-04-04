import { useGetOverviewTracedGraduates } from "../hooks/client";
import { OverviewTracedGraduates } from "../types/types";
import { Card } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

import { GraduationCap, Frown, PlusCircleIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import CreateDepartment from "./modal/CreateDepartment";
import { useState } from "react";
import { getAcronym } from "../../utils/utils";

const OverviewTracedStudents = () => {
  const { data, isLoading } = useGetOverviewTracedGraduates();
  const navigate = useNavigate();
  const [isOpenCollege, setIsOpenCollege] = useState(false);

  return (
    <div className="w-[90%] mx-auto my-5">
      <header className="mb-10 border-b pb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" aria-hidden="true" />
          <div>
            <h1 className="font-bold text-primary text-3xl">
              Traced Graduates
            </h1>
            <h2 className="text-gray-600 mt-1">Sta. Maria Campus</h2>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading && <p>loading</p>}

        {!isLoading && data?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            {isOpenCollege && (
              <CreateDepartment
                isOpen={isOpenCollege}
                handleIsOpen={setIsOpenCollege}
              />
            )}
            <Frown className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
            <p> No College / Department found.</p>
            <Button
              onClick={() => setIsOpenCollege(true)}
              className="bg-primary text-white"
            >
              <PlusCircleIcon />
              Create College / Department
            </Button>
          </div>
        )}

        {!isLoading &&
          data?.map((tracedOverview: OverviewTracedGraduates) => (
            <Card
              key={tracedOverview.id}
              className="p-6 rounded-xl transition-all duration-300 hover:cursor-pointer hover:bg-primary/5 hover:shadow-lg border-2"
              onClick={() => navigate(`/department/${tracedOverview.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <p className="text-primary text-4xl font-bold">
                    {tracedOverview.totalTracedGraduates}
                  </p>
                  <h2 className="text-primary/90 font-bold text-lg leading-tight">
                    {getAcronym(tracedOverview.department)}
                  </h2>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default OverviewTracedStudents;
