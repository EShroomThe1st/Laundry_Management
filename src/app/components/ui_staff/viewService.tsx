import { EyeFilled } from '@ant-design/icons'
import { IconButton } from '../button/buttons'
import { Modal, Table } from 'antd'
import { getAllService } from '~/app/utils/api'
import { ServiceType } from '~/app/models/service'
import CreateNewService from './createService'

export default function ViewServiceType({ record }: { record: ServiceType }) {
  const [modal, contextHolder] = Modal.useModal()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'service_name',
      key: 'service_name'
    },
    {
      title: 'Price',
      dataIndex: 'service_price',
      key: 'service_price'
    }
  ]

  const handleViewServices = async () => {
    try {
      const body = { service_type_id: record.service_type_id }
      console.log(body)
      const response = await getAllService(body)
      if (response.success) {
        modal.info({
          title: `${record.service_type_name}'s services`,
          content: (
            <>
              <div className='w-full flex justify-center'>
                <CreateNewService record={record} onUpdateService={updateService}/>
              </div>
              <Table columns={columns} dataSource={response.data} pagination={{ position: ['bottomCenter'] }} />
            </>
          )
        })
      } else {
        console.error('Error fetching service data:', response)
      }
    } catch (error) {
      console.error('Error fetching service data:', error)
    }
  }

  const updateService = () => {
    handleViewServices();
  }

  return (
    <>
      <IconButton icon={<EyeFilled />} onClick={handleViewServices} />
      {contextHolder}
    </>
  )
}
