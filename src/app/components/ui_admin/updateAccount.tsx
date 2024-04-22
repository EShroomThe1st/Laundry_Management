import { EditOutlined } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Col, Form, Row } from 'antd'
import { FormInput, FormRadioGroup, InputNumberFix, SwitchInput } from '../input/inputs'
import { roleOptions } from '~/constants/testData'
import { User } from '~/app/models/user'
import { DefaultForm } from '../form/form'

export default function UpdateAccount({record}: {record : User}) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: any) => {
    console.log('Received values of form: ', values)
    setOpen(false)
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
              required: true
            }
          ]}
        >
          <InputNumberFix />
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
          rules={[
            {
              required: true
            }
          ]}
        >
          <FormInput />
        </Form.Item>
        <Row>
          <Col span={5}>
            <Form.Item
              name='role_id'
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
