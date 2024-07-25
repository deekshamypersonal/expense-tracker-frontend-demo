import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('aaaaaa');
      fetchAllData(token);
    }
  }, [token]);

  const fetchAllData = async (token) => {
    await fetchTotal(token);
    await fetchExpenses(token);
    await fetchBudgets(token);
    await fetchGroupedExpenses(token);
    
  };

  const fetchExpenses = async (token) => {
    try {
      console.log('testing');
      const response = await fetch('http://localhost:8080/getExpense', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        console.log('testing 1');
        const result = await response.json();
        setExpenses(result);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const fetchTotal = async (token) => {
    try {
      console.log('testing 3');
      const response = await fetch('http://localhost:8080/getTotal', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        console.log('testing 4');
        console.log('abc');
        const totalResult = await response.json();
        setTotal(totalResult);
      } else {
        console.error('Failed to fetch total');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const fetchGroupedExpenses = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/getGroupedExpense', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setGroupedExpenses(result);
      } else {
        console.error('Failed to fetch grouped expenses');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const fetchBudgets = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/getBudgets', {
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setBudgets(result);
      } else {
        console.error('Failed to fetch budgets');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        total,
        expenses,
        groupedExpenses,
        budgets,
        fetchExpenses,
        fetchTotal,
        fetchGroupedExpenses,
        fetchBudgets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

//----------------------------------

