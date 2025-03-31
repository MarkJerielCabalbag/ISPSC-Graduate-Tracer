import { useGetOverviewTracedGraduates } from "../hooks/client";
import { OverviewTracedGraduates } from "../types/types";
import { Card } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";
import { Trash2, GraduationCap } from "lucide-react";

const OverviewTracedStudents = () => {
  const { data, isLoading } = useGetOverviewTracedGraduates();
  const navigate = useNavigate();

  return (
    <div className=" mx-auto w-[90%] my-5">
      <div className="mb-10 border-b pb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          <div>
            <h1 className="font-bold text-primary text-3xl">
              Traced Graduates
            </h1>
            <h2 className="text-gray-600 mt-1">Sta. Maria Campus</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton
                key={index}
                className="h-[160px] rounded-xl bg-primary/10"
              />
            ))}
          </>
        ) : (
          <>
            {data?.map((tracedOverview: OverviewTracedGraduates) => (
              <Card
                key={tracedOverview.id}
                className="p-6 rounded-xl transition-all duration-300 hover:cursor-pointer hover:bg-primary/5 hover:shadow-lg border-2"
                onClick={() => navigate(`/department/${tracedOverview.id}`)}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <h1 className="text-primary text-4xl font-bold">
                      {tracedOverview.totalTracedGraduates}
                    </h1>
                    <h2 className="text-primary/90 font-bold text-lg leading-tight">
                      {tracedOverview.department
                        .split(" ")
                        .filter(
                          (word) => !["and", "of"].includes(word.toLowerCase())
                        )
                        .map((word) => word[0])
                        .join("")}
                    </h2>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTracedStudents;
