// import { useState, useEffect } from 'react'
// import { Table, TableProps } from 'antd'
// import { getAllUser } from '../utils/api'
// import { User } from '../models/user'
// import CreateNewAccount from '../components/ui_admin/creatNewAccount'
// import UpdateAccount from '../components/ui_admin/updateAccount'
// import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

// export default function AdminUsersList() {
//   const [users, setUsers] = useState<User[]>([])

//   const getUsersData = async () => {
//     try {
//       const response = await getAllUser()
//       if (response.success) {
//         setUsers(response.data)
//       } else {
//         console.error('Error fetching users data:', response)
//       }
//     } catch (error) {
//       console.error('Error fetching users data:', error)
//     }
//   }

//   useEffect(() => {
//     getUsersData()  const { role } = useAppSelector((state) => state.auth.currentUser);


//   const columns: TableProps<User>['columns'] = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (_, record) => `${record.first_name} ${record.middle_name || ''} ${record.last_name}`
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email'
//     },
//     {
//       title: 'Phone Number',
//       dataIndex: 'phone_number',
//       key: 'phone_number'
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address'
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role_id',
//       key: 'role_id'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'is_active',
//       key: 'is_active',
//       render: (isActive: boolean) =>
//         isActive ? (
//           <CheckCircleFilled style={{ color: '#0FB900', fontSize: '2rem' }} />
//         ) : (
//           <CloseCircleFilled style={{ color: '#DB0000', fontSize: '2rem' }} />
//         )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <UpdateAccount record={record} />
//         </>
//       )
//     }
//   ]

//   return (
//     <>
//       <div className='w-full flex justify-end'>
//         <CreateNewAccount />
//       </div>
//       <Table columns={columns} dataSource={users} pagination={{ position: ['bottomCenter'] }} />
//     </>
//   )
// }
