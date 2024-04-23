import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Form, notification } from 'antd'
import { FormInput, InputNumberFix } from '../input/inputs'
import { DefaultForm } from '../form/form'
import { createNewService } from '~/app/utils/api'
import { CreateService } from '~/app/models/service'

export default function CreateNewService({record, onUpdateService } : any) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false); 


  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: CreateService) => {
    setIsLoading(true); 
    console.log(values)
    try {
      const response = await createNewService(values);
      console.log('Service created:', response);
      setOpen(false);
      notification.success({
        message: 'Service created successfully',
        description: 'The new service has been created.',
        type: 'success',
      });
      onUpdateService();
    } catch (error) {
      console.error('Error creating service:', error);
      notification.error({
        message: 'Service created unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false); 
    }
  }

  const initialValue: CreateService = {
    service_type_id: record.service_type_id,
    service_name: '',
    service_price: 0
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
        Create New Service
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
              console.log(values)
              const updatedValues = { ...values, service_type_id: record.service_type_id };
              handleSubmit(updatedValues)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <DefaultForm
          form={form}
          name="CreateService"
          initialValues={initialValue}
        >
            <Form.Item
              name='service_name'
              label='Service Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name='service_price'
              label='Service Price'
              rules={[
                {
                  type: "number",
                  required: true,
                  min: 1000
                }
              ]}
            >
              <InputNumberFix />
            </Form.Item>
        </DefaultForm>
      </CustomFormModal>
    </>
  )
}
