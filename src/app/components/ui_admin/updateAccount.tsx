import { EditOutlined } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Col, Form, Row, notification } from 'antd'
import { FormInput, FormRadioGroup, SwitchInput } from '../input/inputs'
import { roleOptions } from '~/constants/testData'
import { User } from '~/app/models/user'
import { DefaultForm } from '../form/form'
import { updateAccount } from '~/app/utils/api'

export default function UpdateAccount({record, onUpdateUser} : {record : any, onUpdateUser : any}) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false);


  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await updateAccount({...values, user_id: record.user_id});
      console.log('Update account:', response);
      notification.success({
        message: 'Account updated successfully',
        description: 'The account has been updated.',
        type: 'success',
      });
      setOpen(false);
      onUpdateUser();
    } catch (error) {
      notification.error({
        message: 'Account updated unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
      console.error('Error updating account:', error);
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleIconClick = (record : User) => {
    console.log('User:', record);
    setOpen(true);
  };

  

  return (
    <>
      <IconButton
        icon={<EditOutlined />}
        onClick={() => handleIconClick(record)}
      />
      <CustomFormModal
        open={open}
        title='Update Account'
        confirmLoading={isLoading}
        onCancel={() => {
          handleCancel()
          form.resetFields()
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
      <DefaultForm
          form={form}
          name="UpdateAccount"
          initialValues={record}
        >
        <Row>
          <Col span={7}>
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
          </Col>
          <Col span={7} offset={1}>
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
          </Col>
          <Col span={7} offset={1}>
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
          </Col>
        </Row>
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
        <Form.Item
              name='is_active'
              label='Active'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <SwitchInput />
        </Form.Item>
        </DefaultForm>
      </CustomFormModal>
    </>
  )
}
