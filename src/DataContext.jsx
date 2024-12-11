import React, { createContext, useState, useEffect } from "react";
import { getTotal, getExpenses, getBudgets, getGroupedExpenses } from "./api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchAllData(token).catch((error) => {
        console.error("Error fetching data:", error);
        // Consider navigating to login or showing an error message
      });
    }
  }, [token]);

  const fetchAllData = async (token) => {
    const [totalResult, expensesResult, groupedResult, budgetsResult] =
      await Promise.all([
        getTotal(token),
        getExpenses(token),
        getGroupedExpenses(token),
        getBudgets(token),
      ]);

    setTotal(totalResult);
    setExpenses(expensesResult);
    setGroupedExpenses(groupedResult);
    setBudgets(budgetsResult);
  };

  // Separate fetchers if needed to refresh partial data
  const fetchTotalData = async (token) => setTotal(await getTotal(token));
  const fetchExpensesData = async (token) =>
    setExpenses(await getExpenses(token));
  const fetchGroupedExpensesData = async (token) =>
    setGroupedExpenses(await getGroupedExpenses(token));
  const fetchBudgetsData = async (token) => setBudgets(await getBudgets(token));

  return (
    <DataContext.Provider
      value={{
        total,
        expenses,
        groupedExpenses,
        budgets,
        fetchTotal: fetchTotalData,
        fetchBudgets: fetchBudgetsData,
        fetchExpenses: fetchExpensesData,
        fetchGroupedExpenses: fetchGroupedExpensesData,
        fetchAllData,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
