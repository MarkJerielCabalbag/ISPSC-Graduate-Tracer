// https://ispsc-graduate-tracer.onrender.com/api/graduateTracer - production
// http://localhost:8080/api/graduateTracer - development

const baseUrl = "http://localhost:8080/api/graduateTracer";
export const client = {
  async createDepartmentCollege(department: string) {
    return await fetch(`${baseUrl}/department/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  async getCollegeDepartment() {
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

  async createProgram(program: string, departmentId: number) {
    return await fetch(`${baseUrl}/program/add/${departmentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ program }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  async getPrograms() {
    return await fetch(`${baseUrl}/program/list`, {
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

  async createMajor(major: string, programId: number) {
    return await fetch(`${baseUrl}/major/add/${programId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ major }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  async getSummaryData() {
    return await fetch(`${baseUrl}/admin/getAllData`, {
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

  //get overview
  async getOverviewTracedGraduates() {
    return await fetch(`${baseUrl}/admin/overviewTracedGraduates`, {
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

  //list of programs
  async listOfPrograms() {
    return await fetch(`${baseUrl}/admin/listOfPrograms`, {
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

  //get graduates per row
  async graduatesPerRow(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/graduates/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get total graduates
  async getTotalGraduates(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/graduates/total/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //add total graduates base on year and program
  async addTotalGraduates(id: number, totalGraduates: number) {
    return await fetch(`${baseUrl}/admin/graduates/total`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, totalGraduates }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get employment statistics
  async getEmploymentStatistics(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/employmentStatistics/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get questoins
  async getQuestions(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/questions/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get percentage
  async getPercentage(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/percentage/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get type of organization
  async getOrganization(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/organization/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get current job location
  async getCurrentJobLocation(yearOfGraduation: string, program: string) {
    return await fetch(
      `${baseUrl}/admin/jobLocation/${yearOfGraduation}/${program}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  //get department details
  async getDepartmentDetails() {
    return await fetch(`${baseUrl}/admin/department/details`, {
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

  async removeProgram(programId: number) {
    return await fetch(`${baseUrl}/program/remove/${programId}`, {
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

  async editProgram(programId: number, program: string) {
    return await fetch(`${baseUrl}/program/edit/${programId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ program }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  async removeMajor(majorId: number) {
    return await fetch(`${baseUrl}/major/remove/${majorId}`, {
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

  async editMajor(majorId: number, major: string) {
    return await fetch(`${baseUrl}/major/edit/${majorId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ major }),
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "An Error Occured");
      }

      return response;
    });
  },

  async removeDepartment(departmentId: number) {
    return await fetch(`${baseUrl}/department/remove/${departmentId}`, {
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

  //delete student
  async deleteStudentInfo(studentId: number) {
    return await fetch(`${baseUrl}/admin/student/response/${studentId}`, {
      method: "POST",
    }).then(async (res) => {
      const response = await res.json();

      if (!res.ok) {
        throw new Error(response?.message || "An Error Occured");
      }

      return response;
    });
  },
};
