import { useGetOverviewTracedGraduates } from "../hooks/client";
import { OverviewTracedGraduates } from "../types/types";
import { Card } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";

const OverviewTracedStudents = () => {
  const { data, isLoading } = useGetOverviewTracedGraduates();
  const navigate = useNavigate();
  return (
    <div className="w-[90%] mx-auto my-5">
      <div className="my-5">
        <h1 className="font-bold text-primary text-2xl">Traced Graduates</h1>
        <h2 className="text-md">Graduates of Sta. Maria Campus</h2>
      </div>
      {isLoading ? (
        <div>loading.....</div>
      ) : (
        <div className="flex items-center gap-2">
          {data.map((tracedOverview: OverviewTracedGraduates) => (
            <Card
              key={tracedOverview.id}
              className="w-[20%] p-5 rounded-md"
              onClick={() => navigate(`/department/${tracedOverview.id}`)}
            >
              <h1 className="text-primary text-3xl ">
                {tracedOverview.totalTracedGraduates}
              </h1>
              <h1 className="text-primary font-extrabold">
                {tracedOverview.department
                  .split(" ")
                  .filter(
                    (word) =>
                      word.toLowerCase() !== "and" &&
                      word.toLowerCase() !== "of"
                  )
                  .map((word) => word[0])
                  .join("")}
              </h1>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewTracedStudents;
