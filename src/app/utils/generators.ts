import { Role } from "../models/user";

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatUnixToLocal = (
  unixTimestamp: string,
  locale: string = "vi-VN",
) => {
  const date = new Date(unixTimestamp);
  const dateString = date.toLocaleDateString(locale);
  const timeString = date.toLocaleTimeString(locale);
  return `${timeString} on ${dateString}`;
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
      return null;
  }
}

export function paymentColor(payment_status: string | null){
  let color = '';
  switch (payment_status) {
    case 'Refunded':
      color = '#DB0000';
      break;
    case 'Not yet':
      color = '#C7A700';
      break;
    case 'Paid':
      color = '#0FB900';
      break;
    default:
      color = 'black';
  }

  return color
}

export function statusColor(status: string | null){
  let color = '';
  switch (status) {
    case 'Canceled':
      color = '#DB0000';
      break;
    case 'Processing':
      color = '#C7A700';
      break;
    case 'Received':
      color = '#C7A700';
        break;
    case 'Washing':
      color = '#C7A700';
        break;
    case 'Finished':
          color = '#0FB900';
        break;
    case 'Ended':
      color = '#0FB900';
      break;
    default:
      color = 'black';
  }

  return color
}

export function statusNext(status: string | null){
  let color = '';
  switch (status) {
    case 'Processing':
      return 'Received'
    case 'Received':
      return 'Washing';
    case 'Washing':
      return 'Finished';
    case 'Finished':
      return 'Ended';
    default:
      color = 'black';
  }

  return color
}