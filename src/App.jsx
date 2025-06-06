import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Statistic from "./pages/Statistic";
import Profile from "./pages/Profile";
import { QueryClientProvider } from "@tanstack/react-query";
import Overview from "./features/dashboard/Overview";
import Income from "./features/income/Income";
import Savings from "./features/savings/Savings";
import Expenses from "./features/expenses/Expenses";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Balance from "./features/balance/Balance";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthProvider";
import Calendar from "./pages/Calendar";
import ReportPage from "./pages/ReportPage";
import IncomeReport from "./features/reports/IncomeReport";
import ExpenseReport from "./features/reports/ExpenseReport";
import SavingsReport from "./features/reports/SavingsReport";
import BalanceReport from "./features/reports/BalanceReport";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import ProtectedSuperuserRoute from "./ui/ProtectedSuperuserRoute";
import { ThemeProvider } from "./context/ThemeContext";
import Support from "./pages/Support";
import { MessageNotificationProvider } from "./context/MessageNotificationProvider";
import { queryClient } from "./queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <MessageNotificationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route
                      index
                      element={<Navigate replace to="dashboard/overview" />}
                    />
                    <Route path="dashboard" element={<Dashboard />}>
                      <Route path="overview" element={<Overview />} />
                      <Route path="income" element={<Income />} />
                      <Route path="expenses" element={<Expenses />} />
                      <Route path="balance" element={<Balance />} />
                      <Route path="savings" element={<Savings />} />
                    </Route>
                    <Route path="budget" element={<Budget />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="statistic" element={<Statistic />} />
                    <Route path="profile" element={<Profile />} />
                    <Route element={<ProtectedSuperuserRoute />}>
                      <Route path="admin" element={<AdminPanel />} />
                    </Route>
                    <Route path="support" element={<Support />} />
                  </Route>
                  <Route path="report" element={<ReportPage />}>
                    <Route path="income" element={<IncomeReport />} />
                    <Route path="expense" element={<ExpenseReport />} />
                    <Route path="savings" element={<SavingsReport />} />
                    <Route path="balance" element={<BalanceReport />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                className: "app-toast",
              }}
            />
          </MessageNotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
