import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

const OverviewRowGraduates = () => {
  const { year, program } = useParams();
  return (
    <div>
      <Header />
      {year}, {program}
    </div>
  );
};

export default OverviewRowGraduates;
