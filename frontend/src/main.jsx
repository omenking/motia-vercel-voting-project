import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "pages/App";
import ApplicationLayout from "layouts/ApplicationLayout";
import AdminLayout from "layouts/AdminLayout";

import PollsShow from "pages/PollsShow";
import AdminPollsIndex from "pages/AdminPollsIndex";
import AdminPollsShow from "pages/AdminPollsShow";
import AdminPollsForm from "pages/AdminPollsForm";
import 'css/defaults.css';

const root = document.querySelector('main');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="admin">
          <Route index element={<AdminPollsIndex />} />
          <Route path="polls/new" element={<AdminPollsForm />} />
          <Route path="polls/:id" element={<AdminPollsShow />} />
          <Route path="polls/:id/edit" element={<AdminPollsForm />} />
        </Route>
      </Route>

      <Route element={<ApplicationLayout />}>
        <Route index element={<App />} />
        <Route path="/:uuid" element={<PollsShow />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);