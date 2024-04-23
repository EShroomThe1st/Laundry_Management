import { useState, useEffect, Key } from 'react'
import { Table, TableProps } from 'antd'
import { getAllUser } from '../utils/api'
import { User } from '../models/user'
import CreateNewAccount from '../components/ui_admin/creatNewAccount'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { translateRole } from '../utils/generators'
import { CustomDropdown, CustomDropdownProps } from '../components/ui_admin/dropDown'

export default function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([])

  const getUsersData = async () => {
    try {
      const response = await getAllUser()
      if (response.success) {
        setUsers(response.data.map((user : User)=>(
          {...user,
          role_name: translateRole(user.role_id)
          }
        )))
      } else {
        console.error('Error fetching users data:', response)
      }
    } catch (error) {
      console.error('Error fetching users data:', error)
    }
  }

  const onUpdateUser = () => {
    getUsersData();
  }

  useEffect(() => {
    getUsersData()
  }, [])

  const dropdownItems: CustomDropdownProps["items"] = [
    {
      key: "update",
      label: "Update Account",
    },
    {
      key: "disable",
      label: "Disable Account",
      danger: true
    },
  ];

  const checkDisabled = (
    key: Key | undefined,
    record: User,
  ): boolean => {
    const { is_active } = record;
    switch (key) {
      case "disable":
        return !is_active;
      default:
        return false;
    }
  };
  

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.middle_name || ''} ${record.last_name}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string | null) =>
        address ? (
          address 
        ) : (
          <div className='font-bold text-[1.5rem]'>
            -
          </div>
        )
    },     
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) =>
        isActive ? (
          <CheckCircleFilled style={{ color: '#0FB900', fontSize: '2rem' }} />
        ) : (
          <CloseCircleFilled style={{ color: '#DB0000', fontSize: '2rem' }} />
        )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: "center",
      render: (_, record) => (
        <>
          <CustomDropdown items={dropdownItems} checkDisabled={checkDisabled} record={record} onUpdateUser={onUpdateUser}/>
        </>
      )
    }
        // {
    //   title: 'Update',
    //   key: 'update',
    //   render: (_, record) => (
    //     <>
    //       <UpdateAccount record={record} onUpdateUser={onUpdateUser}/>
    //     </>
    //   )
    // }
  ]

  return (
    <>
      <div className='w-full flex justify-end'>
        <CreateNewAccount onUpdateUser={onUpdateUser}/>
      </div>
      <Table columns={columns} dataSource={users} pagination={{ position: ['bottomCenter'] }} />
    </>
  )
}
