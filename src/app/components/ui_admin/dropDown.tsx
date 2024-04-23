import { EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Col, Dropdown, Form, MenuProps, Modal, Row, notification } from 'antd'
import { Key } from 'react'
import { User } from '~/app/models/user'
import { disabledAccount, updateAccount } from '~/app/utils/api'
import { DefaultForm } from '../form/form'
import { FormInput, FormRadioGroup } from '../input/inputs'
import { roleOptions } from '~/constants/testData'

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
  record: User
  onUpdateUser: any
  checkDisabled: (key: Key | undefined, record: User) => boolean
}

export function CustomDropdown({ items, record, onUpdateUser, checkDisabled }: CustomDropdownProps) {
  const [modal, contextHolder] = Modal.useModal()
  const [form] = Form.useForm()


  const DisableAccount = async () => {
    try {
      const body = { user_id: record.user_id }
      await disabledAccount(body)
      console.log('Laundry pack deleted successfully')
      notification.success({
        message: 'Laundry pack deleted successfully',
        description: 'The laundry pack type has been deleted.',
        type: 'success'
      })
      onUpdateUser()
    } catch (error) {
      notification.error({
        message: 'Laundry pack deleted unsuccessfully',
        description: `${error}`,
        type: 'error'
      })
      console.error('Error deleting laundry pack:', error)
    }
  }

  const handleUpdate = async (values: any) => {
    try {
      const response = await updateAccount(values);
      console.log('Update account:', response);
      notification.success({
        message: 'Account updated successfully',
        description: 'The account has been updated.',
        type: 'success',
      });
      onUpdateUser();
    } catch (error) {
      notification.error({
        message: 'Account updated unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
      console.error('Error updating account:', error);
    }
  }

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e
    switch (key) {
      case 'update': {
        modal.confirm({
          title: 'Update Status',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              <DefaultForm form={form} name='UpdateAccount' initialValues={record} onFinish={handleUpdate}>
            <Form.Item
              name='first_name'
              label='First Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name='middle_name'
              label='Middle Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name='last_name'
              label='Last Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
        <Form.Item
          name='phone_number'
          label='Phone Number'
          rules={[
            {
              required: true,
              type: "string",
              pattern: /^[0-9]+$/,
              len: 10,
              message: "Phone number is invalid",
              whitespace: true,
            }
          ]}
        >
          <FormInput />
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
        >
          <FormInput />
        </Form.Item>
        <Row>
          <Col span={5}>
            <Form.Item
              name='role_name'
              label='Role'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormRadioGroup options={roleOptions} />
            </Form.Item>
          </Col>
        </Row>
              </DefaultForm>
            </div>
          ),
          okText: 'Confirm',
          okType: 'primary',
          cancelText: 'Cancel',
          onOk() {
            form
              .validateFields()
              .then((values) => {
                const updatedValues = {...values, user_id: record.user_id}
                handleUpdate(updatedValues)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })
          },
          onCancel() {}
        })
        break
      }
      case 'disable': {
        modal.confirm({
          title: 'Are you sure',
          icon: <ExclamationCircleFilled />,
          content: (
            <div>
              Do you want to disable <span className='font-bold'>{record.first_name} {record.middle_name} {record.last_name}</span>?
            </div>
          ),
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk() {
            console.log(`${key}: ${record.user_id}`)
            DisableAccount()
            onUpdateUser()
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
