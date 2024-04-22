import { DeleteOutlined } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { DeleteModal } from '../modal/modal'
import { useState } from 'react'
import { Laundry } from '~/app/models/laundry'
import { deleteLaundryPack } from '~/app/utils/api'

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
      setOpen(false)
      onUpdateLaundryPacks()
    } catch (error) {
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
      <IconButton icon={<DeleteOutlined />} onClick={() => handleIconClick(record)} />
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
