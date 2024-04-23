import { DeleteFilled } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { DeleteModal } from '../modal/modal'
import { useState } from 'react'
import { Laundry } from '~/app/models/laundry'
import { deleteLaundryPack } from '~/app/utils/api'
import { notification } from 'antd'

export default function DeleteLaundry({
  record,
  onUpdateLaundryPacks
}: {
  record: Laundry
  onUpdateLaundryPacks: any
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false); 

  const handleDelete = async () => {
    setIsLoading(true); 
    try {
      const body = { laundry_pack_id: record.laundry_pack_id };
      await deleteLaundryPack(body)
      console.log('Laundry pack deleted successfully')
      notification.success({
        message: 'Laundry pack deleted successfully',
        description: 'The laundry pack type has been deleted.',
        type: 'success',
      });
      setOpen(false)
      onUpdateLaundryPacks()
    } catch (error) {
      notification.error({
        message: 'Laundry pack deleted unsuccessfully',
        description: `${error}`,
        type: 'error',
      });
      console.error('Error deleting laundry pack:', error)
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleCancel = () => {
    setOpen(false)
  }

  const handleIconClick = (record: Laundry) => {
    console.log('Laundry:', record)
    setOpen(true)
  }

  return (
    <>
      <IconButton icon={<DeleteFilled />} onClick={() => handleIconClick(record)} />
      <DeleteModal
        title={`Delete ${record.laundry_pack_name}?`}
        open={open}
        onCancel={handleCancel}
        onOk={handleDelete}
        confirmLoading={isLoading}
      />
    </>
  )
}
