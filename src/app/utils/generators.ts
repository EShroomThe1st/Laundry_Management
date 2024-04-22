import { Role } from "../models/user";

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export function translateRole(roleId: Role["role_id"] | null) {
  switch (roleId) {
    case 'dad0eada-f17a-42bd-baee-14fe2b4c767d':
      return 'Customer';
    case '1ca0dd92-8109-4a02-b6e5-448d4f5f017c':
      return 'Admin';
    case 'b4ea2d38-8c6f-42a9-83fe-0fc20cc564a2':
      return 'Staff';
    default:
      return 'Unknown Role';
  }
}

export function translateRoleFromNonsense(role: string | null) {
  switch (role) {
    case 'kh':
      return 'Customer';
    case 'ql':
      return 'Admin';
    case 'culi':
      return 'Staff';
    default:
      return 'Unknown Role';
  }
}