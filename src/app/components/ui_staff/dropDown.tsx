import { EllipsisOutlined, EnvironmentFilled, ExclamationCircleFilled, PhoneFilled } from '@ant-design/icons'
import { Dropdown, MenuProps, Modal, Table, TableProps, Typography, notification } from 'antd'
import { Key } from 'react'
import { Order, OrderDetail } from '~/app/models/order'
import Icon from '../../../assets/User.png'
import { cancelOrder, getOrderById, getUserById, updateOrder } from '~/app/utils/api'
import { formatCurrency, formatUnixToLocal, statusColor, statusNext } from '~/app/utils/generators'

export type CustomDropdownProps = {
  items: {
    key: Key
    label: React.ReactNode
    disabled?: boolean
    dashed?: boolean
    type?: 'item' | 'divider'
    style?: React.CSSProperties
    className?: string
    [key: string]: any
  }[]
  record: Order
  updateOrderAfter: any
  checkDisabled: (key: Key | undefined, record: Order) => boolean
}

export function CustomDropdown({ items, record, updateOrderAfter, checkDisabled }: CustomDropdownProps) {
  const [modal, contextHolder] = Modal.useModal()
  const { Paragraph, Title } = Typography

  const handleUpdate = async (values: any) => {
    try {
      const response = await updateOrder(values)
      console.log('Update order:', response)
      notification.success({
        message: 'Order updated successfully',
        description: 'The order has been updated.',
        type: 'success'
      })
      updateOrderAfter()
    } catch (error) {
      notification.error({
        message: 'Order updated unsuccessfully',
        description: `${error}`,
        type: 'error'
      })
      console.error('Error updating account:', error)
    }
  }

  const handleCancel = async () => {
    try {
      const body = { order_id: record.order_id }
      const response = await cancelOrder(body)
      console.log('Cancel Order:', response)
      notification.success({
        message: 'Order canceled successfully',
        description: 'The order has been canceled.',
        type: 'success'
      })
      updateOrderAfter()
    } catch (error) {
      notification.error({
        message: 'Order updated canceled',
        description: `${error}`,
        type: 'error'
      })
      console.error('Error canceled account:', error)
    }
  }

  const columns: TableProps['columns'] = [
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      key: 'order_status',
      render: (order_status) => (
        <span style={{ color: statusColor(order_status), fontWeight: 'bold' }}>{order_status}</span>
      )
    },
    {
      title: 'Started On',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => formatUnixToLocal(timestamp)
    }
  ]

  const getOrderDetail = async () => {
    try {
      const body = { order_id: record.order_id }
      const response = await getOrderById(body)
      if (response.success) {
        const orderDetail = response.data as OrderDetail
        console.log('Order Detail response:', response)
        console.log('Order Detail:', response.data)
        modal.info({
          title: 'Order Info',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              <Title style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                {orderDetail?.service_type.service_type_name}
              </Title>
              <div className='mt-10'>
                <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className='font-bold'>Order Status:</span>{' '}
                  <span style={{ color: statusColor(orderDetail?.order_status) }}>{orderDetail?.order_status}</span>
                </Paragraph>
                <div className='mt-10'>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className='font-bold'>{orderDetail?.service.service_name}</span>
                    <span>{formatCurrency(orderDetail?.service.service_price)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className='font-bold'>{orderDetail?.laundry_pack.laundry_pack_name}</span>
                    <span>{formatCurrency(orderDetail?.laundry_pack.laundry_pack_price)}</span>
                  </div>
                  <hr className='border-t-2 border-solid border-gray-400 my-5' />
                  <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className='font-bold'>Total</span>
                    <span>{formatCurrency(orderDetail?.order_price)}</span>
                  </Paragraph>
                </div>
                <Table columns={columns} dataSource={orderDetail.order_progress} pagination={false} />
              </div>
            </div>
          ),
          onOk() {}
        })
      }
    } catch (error) {
      console.error('Error canceled account:', error)
    }
  }

  const getUserDetail = async () => {
    try {
      const body = { user_id: record.user.user_id }
      const response = await getUserById(body)
      if (response.success) {
        const userDetail = response.data
        console.log('User Detail response:', response)
        console.log('User Detail:', response.data)
        modal.info({
          title: 'Order Info',
          icon: <ExclamationCircleFilled />,
          content: (
            <div className='text-center'>
              <div className='flex justify-center'><img src={Icon} alt='User-Icon' className='w-24'/></div>
              <Title style={{ fontSize: '1.2rem' }}>{userDetail?.full_name}</Title>
              <div>{userDetail?.email}</div>
              <div>
                <PhoneFilled /> {userDetail?.phone_number}
              </div>
              <div>
                <EnvironmentFilled /> {userDetail?.address}
              </div>
            </div>
          ),
          onOk() {}
        })
      }
    } catch (error) {
      console.error('Error canceled account:', error)
    }
  }

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    switch (key) {
      case 'user': {
        getUserDetail()
        break
      }
      case 'order': {
        getOrderDetail()
        break
      }
      case 'update': {
        modal.confirm({
          title: 'Update Status',
          icon: <ExclamationCircleFilled />,
          content: <>Do you want to change status to {statusNext(record.order_status)}?</>,
          okText: 'Confirm',
          okType: 'primary',
          cancelText: 'Cancel',
          onOk() {
            handleUpdate({ order_id: record.order_id })
          },
          onCancel() {}
        })
        break
      }
      case 'cancel': {
        modal.confirm({
          title: 'Are you sure',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              Do you want to cancel {record.service.service_name} of {record.user.full_name}
            </div>
          ),
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk() {
            console.log(`${key}: ${record.order_id}`)
            handleCancel()
          },
          onCancel() {}
        })
        break
      }
      default:
        break
    }
  }

  return (
    <>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            ...item,
            disabled: checkDisabled(item.key, record)
          })),
          onClick: (e) => onMenuClick(e)
        }}
        placement='bottomLeft'
        trigger={['click']}
      >
        <EllipsisOutlined />
      </Dropdown>
      {contextHolder}
    </>
  )
}
