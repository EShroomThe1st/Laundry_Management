import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Form, notification } from 'antd'
import { FormInput } from '../input/inputs'
import { DefaultForm } from '../form/form'
import { createNewServiceType } from '~/app/utils/api'
import { CreateServiceType } from '~/app/models/service'

export default function CreateNewServiceType({ onUpdateServiceType } : any) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false); 


  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: CreateServiceType) => {
    setIsLoading(true); 
    try {
      const response = await createNewServiceType(values);
      console.log('Service type created:', response);
      setOpen(false);
      notification.success({
        message: 'Service type created successfully',
        description: 'The new service type has been created.',
        type: 'success',
      });
      onUpdateServiceType();
    } catch (error) {
      console.error('Error creating service type:', error);
      notification.error({
        message: 'Service type created unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false); 
    }
  }

  const initialValue: CreateServiceType = {
    service_type_name: ''
  }

  return (
    <>
      <PrimaryButton size='large' style={{ display: 'flex', margin: "2rem 2rem 2rem 0"}} onClick={() => setOpen(true)}>
        <PlusCircleFilled
          style={{
            color: 'white',
            fontSize: '1.5rem'
          }}
        />{' '}
        Create New Service Type
      </PrimaryButton>
      <CustomFormModal
        open={open}
        title='Create New Service Type'
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
          name="CreateServiceType"
          initialValues={initialValue}
        >
            <Form.Item
              name='service_type_name'
              label='Service Type Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
        </DefaultForm>
      </CustomFormModal>
    </>
  )
}
