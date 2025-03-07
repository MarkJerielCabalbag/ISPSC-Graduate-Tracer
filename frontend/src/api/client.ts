const baseUrl = "http://localhost:3000/api/graduateTracer";
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
};
