import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./admin/Dashboard.tsx";
import OverviewRowGraduates from "./admin/components/OverviewRowGraduates.tsx";
import OverviewDepartments from "./admin/components/OverviewDepartments.tsx";
import Home from "./components/Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route
        path="/graduates/:year/:program"
        element={<OverviewRowGraduates />}
      />
      <Route
        path="/department/:departmentId"
        element={<OverviewDepartments />}
      />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
