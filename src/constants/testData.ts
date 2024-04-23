import { Role, User } from '~/app/models/user'

export const user: User[] = [
  {
    user_id: 'c0d38e2b-3646-4e82-b1dc-6f45aa274c4f',
    first_name: 'Nguyen',
    middle_name: 'Van',
    last_name: 'A',
    password_hashed: '$2b$12$JAawKh1fknYsbp6KqjPqKuHCduI5UGppjebtPaGdXVbotpkeGpX5C',
    email: 'NguyenVanA@gmail.com',
    phone_number: '0901234567',
    last_update: '2024-04-20T22:47:40.501Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d'
  },
  {
    user_id: '8ece8a5c-3012-4016-b1cd-2201aedcdd0b',
    first_name: 'Truong',
    middle_name: 'Quang Hong',
    last_name: 'Phuc',
    password_hashed: '$2b$12$4lYWcIOqQ9i7sUmrKaJ5i.HxSj.ppyoguadcq9hjGnntqYUukrpaC',
    email: 'Ufd34@gmail.com',
    phone_number: '0386691787',
    last_update: '2024-04-17T01:22:40.607Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d'
  },
  {
    user_id: '2efb2aae-41ef-4212-999a-e10f1ef2606f',
    first_name: 'Vo',
    middle_name: 'Minh',
    last_name: 'Thang',
    password_hashed: '$2b$12$dnR4EX0uiPxv1eTPImHHM.WYcANJn56bt8wrRuiwGNhHIiMt2ldoS',
    email: 'osFg62Z@gmail.com',
    phone_number: '0344523125',
    last_update: '2024-04-17T01:28:22.841Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d'
  }
]

export const roleOptions = [
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Staff',
    label: 'Staff'
  },
  {
    value: 'Customer',
    label: 'Customer'
  },
]

export const role: Role[] = [
  {
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d',
    role_name: 'Customer'
  },
  {
    role_id: '1ca0dd92-8109-4a02-b6e5-448d4f5f017c',
    role_name: 'Admin'
  },
  {
    role_id: 'b4ea2d38-8c6f-42a9-83fe-0fc20cc564a2',
    role_name: 'Staff'
  },
]

export const orderStatusOptions = [
  {
    value: 'Processing',
    label: 'Processing'
  },
  {
    value: 'Received',
    label: 'Received'
  },
  {
    value: 'Washing',
    label: 'Washing'
  },
  {
    value: 'Finished',
    label: 'Finished'
  },
  {
    value: 'Ended',
    label: 'Ended'
  },
]