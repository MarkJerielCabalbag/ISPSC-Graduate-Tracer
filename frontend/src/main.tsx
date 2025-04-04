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

import Dashboard from "./admin/Dashboard.tsx";
import OverviewRowGraduates from "./admin/components/OverviewRowGraduates.tsx";

import Home from "./components/Home.tsx";
import Form from "./Form.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route
        path="/graduates/:year/:program"
        element={<OverviewRowGraduates />}
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
