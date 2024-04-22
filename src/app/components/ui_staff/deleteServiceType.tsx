import { DeleteOutlined } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { DeleteModal } from '../modal/modal'
import { useState } from 'react'
import { deleteServiceType } from '~/app/utils/api'
import { ServiceType } from '~/app/models/service'

export default function DeleteServiceType({
  record,
  onUpdateServiceType
}: {
  record: ServiceType
  onUpdateServiceType: any
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false); 

  const handleDelete = async () => {
    setIsLoading(true); 
    try {
      const body = { service_type_id: record.service_type_id };
      await deleteServiceType(body)
      console.log('Service type deleted successfully')
      setOpen(false)
      onUpdateServiceType()
    } catch (error) {
      console.error('Error deleting service type:', error)
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton icon={<DeleteOutlined />} onClick={() => setOpen(true)} />
      <DeleteModal
        title={`Delete ${record.service_type_name}?`}
        open={open}
        onCancel={handleCancel}
        onOk={handleDelete}
        confirmLoading={isLoading}
      />
    </>
  )
}
