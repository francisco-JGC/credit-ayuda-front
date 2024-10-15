export type Client = {
  id: number;
  name: string;
  phone: string;
  address: string;
  currentDebt: number;
  route: string;
  loanStatus: "approved" | "pending" | "paid";
};
