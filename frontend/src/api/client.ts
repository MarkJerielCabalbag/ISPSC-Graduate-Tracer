// https://ispsc-graduate-tracer.onrender.com/api/graduateTracer - production
// http://localhost:5000/api/graduateTracer - development

const baseUrl = "https://ispsc-graduate-tracer.onrender.com/api/graduateTracer";
import { Response } from "../types/type";
export const client = {
  //get list of departments
  async getDepartment() {
    return await fetch(`${baseUrl}/department/list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get program related to department / college
  async getRelatedProgram(id: number) {
    return await fetch(`${baseUrl}/department/program/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get major related to program
  async getRelatedMajor(id: number) {
    return await fetch(`${baseUrl}/major/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //user add response
  async addResponse({
    yearOfSurvey,
    email,
    fullName,
    yearOfGraduation,
    departmentId,
    programId,
    majorId,
    isEmployed,
    isJobAligned,
    isSelfEmployed,
    isFurtherStudies,
    typeOfOrganization,
    currentJobLocated,
  }: Response) {
    return await fetch(`${baseUrl}/user/add/response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        yearOfSurvey,
        email,
        fullName,
        yearOfGraduation,
        departmentId,
        programId,
        majorId,
        isEmployed,
        isJobAligned,
        isSelfEmployed,
        isFurtherStudies,
        typeOfOrganization,
        currentJobLocated,
      }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },
};
