import { useNavigate, useParams } from "react-router-dom";
import { useGetDepartmentDetails } from "../hooks/client";
import Header from "./Header";
import { DepartmentDetails, Major } from "../types/types";
import { ArrowLeft, BookCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const OverviewDepartments = () => {
  const { departmentId } = useParams();
  const { data, isLoading, isFetching } = useGetDepartmentDetails(
    departmentId ?? ""
  );

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="w-[90%] mx-auto">
        {isLoading || isFetching ? (
          <div>loading</div>
        ) : (
          <>
            <h1 className="text-lg text-primary font-bold my-5 flex gap-2 items-center">
              <ArrowLeft onClick={() => navigate("/admin")} /> Programs
            </h1>
            <div className="bg-primary/10 p-5 rounded-md">
              {data.map((department: DepartmentDetails) => (
                <div key={department.program}>
                  <div className="text-primary font-semibold flex gap-2 items-center">
                    <BookCheck /> {department.program}
                  </div>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-primary">
                        List of Majors
                      </AccordionTrigger>
                      <AccordionContent>
                        {department?.listOfMajor?.map((major: Major) => (
                          <div key={major.id}>
                            <p className="text-sm italic text-primary opacity-75">
                              {major.major}
                            </p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
