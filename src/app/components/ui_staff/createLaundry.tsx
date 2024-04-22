import { PlusCircleFilled } from '@ant-design/icons'
import { PrimaryButton } from '../button/buttons'
import { useState } from 'react'
import { CustomFormModal } from '../modal/modal'
import { Form, notification } from 'antd'
import { FormInput, InputNumberFix } from '../input/inputs'
import { DefaultForm } from '../form/form'
import { CreateLaundry } from '~/app/models/laundry'
import { createLaundryPack } from '~/app/utils/api'

export default function CreateLaundryModal({ onUpdateLaundryPacks } : any) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false); 

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = async (values: CreateLaundry) => {
    setIsLoading(true)
    try {
      const response = await createLaundryPack(values);
      console.log('Laundry pack created:', response);
      notification.success({
        message: 'Laundry pack created successfully',
        description: 'The new laundry pack has been created.',
        type: 'success',
      });
      setOpen(false);
      onUpdateLaundryPacks();
    } catch (error) {
      notification.error({
        message: 'Laundry pack created unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
      console.error('Error creating laundry pack:', error);
    }
    finally{
      setIsLoading(false)
    }
  }

  const initialValue: CreateLaundry = {
    new_laundry_pack_name: "",
    new_laundry_pack_price: 0,
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
        Create New Laundry Pack
      </PrimaryButton>
      <CustomFormModal
        open={open}
        confirmLoading={isLoading}
        title='Creat New Laundry Pack'
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
          name="CreatePack"
          initialValues={initialValue}
        >
            <Form.Item
              name='new_laundry_pack_name'
              label='Laundry Pack Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <FormInput />
            </Form.Item>

            <Form.Item
              name='new_laundry_pack_price'
              label='Price'
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
