// api.js
const BASE_URL = import.meta.env.VITE_API_URL; // Ensure you've set this in .env

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Invalid credentials");
  const token = response.headers.get("authorization") || response.headers.get("Authorization");
  if (!token) throw new Error("No token received");
  return `Bearer ${token}`;
}

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Error registering user");
}

export async function uploadBill(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload the file");
  return response.text();
}

export async function setExpense(expenseRequest, token) {
  const response = await fetch(`${BASE_URL}/setExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(expenseRequest),
  });
  if (!response.ok) throw new Error("Failed to set expense");
}

export async function getTotal(token) {
  const response = await fetch(`${BASE_URL}/getTotal`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to fetch total");
  return response.json();
}

export async function getExpenses(token) {
  const response = await fetch(`${BASE_URL}/getExpense`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return response.json();
}

export async function getGroupedExpenses(token) {
  const response = await fetch(`${BASE_URL}/getGroupedExpense`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to fetch grouped expenses");
  return response.json();
}

export async function getBudgets(token) {
  const response = await fetch(`${BASE_URL}/getBudgets`, {
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to fetch budgets");
  return response.json();
}

export async function setBudget(budgetRequest, token) {
  const response = await fetch(`${BASE_URL}/setBudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(budgetRequest),
  });
  if (!response.ok) throw new Error("Failed to set budget");
}

export async function deleteBudget(id, token) {
  const response = await fetch(`${BASE_URL}/deleteBudget/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to delete budget");
}

export async function deleteExpense(id, token) {
  const response = await fetch(`${BASE_URL}/deleteExpense/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!response.ok) throw new Error("Failed to delete expense");
}
