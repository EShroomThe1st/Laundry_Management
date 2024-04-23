// import { EditOutlined } from '@ant-design/icons'
// import { IconButton } from '../button/buttons'
// import { useState } from 'react'
// import { CustomFormModal } from '../modal/modal'
// import { Form, Select, notification } from 'antd'
// import { orderStatusOptions } from '~/constants/testData'
// import { DefaultForm } from '../form/form'
// import { updateAccount } from '~/app/utils/api'

// export default function UpdateAccount({ isOpen, record, onUpdateOrder }: {isOpen: boolean, record: any; onUpdateOrder: any }) {
//   const [open, setOpen] = useState(isOpen)
//   const [form] = Form.useForm()
//   const [isLoading, setIsLoading] = useState(open)

//   const handleCancel = () => {
//     setOpen(false)
//   }

//   const handleSubmit = async (values: any) => {
//     setIsLoading(true)
//     try {
//       const response = await updateAccount({ ...values, user_id: record.user_id })
//       console.log('Update account:', response)
//       notification.success({
//         message: 'Account updated successfully',
//         description: 'The account has been updated.',
//         type: 'success'
//       })
//       setOpen(false)
//       onUpdateOrder()
//     } catch (error) {
//       notification.error({
//         message: 'Account updated unsuccessfully',
//         description: `${error}`,
//         type: 'error'
//       })
//       console.error('Error updating account:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSubmit = async (values: any) => {
//     setIsLoading(true)
//     try {
//       const response = await updateOrder(values);
//       console.log('Update account:', response);
//       notification.success({
//         message: 'Order updated successfully',
//         description: 'The order has been updated.',
//         type: 'success',
//       });
//       updateOrder();
//     } catch (error) {
//       notification.error({
//         message: 'Order updated unsuccessfully',
//         description: `${error}`,
//         type: 'error',
//       });
//       console.error('Error updating account:', error);
//     } finally {
//       setIsLoading(false)
//     }
//   }


//   return (
//     <>
//       <CustomFormModal
//         open={open}
//         title='Update Order'
//         confirmLoading={isLoading}
//         onCancel={() => {
//           handleCancel()
//           form.resetFields()
//         }}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               handleSubmit(values)
//             })
//             .catch((info) => {
//               console.log('Validate Failed:', info)
//             })
//         }}
//       >
//         <DefaultForm form={form} name='UpdateOrder' initialValues={record} onFinish={handleSubmit}>
//           <Form.Item
//             name='order_status'
//             label='Service Name'
//             rules={[
//               {
//                 required: true
//               }
//             ]}
//           >
//             <Select defaultValue={record.order_status} options={orderStatusOptions} />
//           </Form.Item>
//         </DefaultForm>
//       </CustomFormModal>
//     </>
//   )
// }
