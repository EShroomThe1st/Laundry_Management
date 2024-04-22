import { EyeFilled } from '@ant-design/icons';
import { IconButton } from '../button/buttons';
import { useState } from 'react';
import { Modal, Table } from 'antd';
import { getAllService } from '~/app/utils/api';
import { ServiceType } from '~/app/models/service';

export default function ViewServiceType({ record }: { record: ServiceType }) {
  const [service, setService] = useState([]);
  const [modal, contextHolder] = Modal.useModal();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'service_name',
      key: 'service_name',
    },
    {
      title: 'Price',
      dataIndex: 'service_price',
      key: 'service_price',
    },
    {
      title: 'Delete',
      key: 'delete',
    },
  ];

  const handleViewServices = async () => {
    try {
      const body = { service_type_id: record.service_type_id };
      console.log(body)
      const response = await getAllService(body)
      if (response.success) {
        setService(response.data);
        modal.info({
          title: `${record.service_type_name}'s services`,
          content: <Table columns={columns} dataSource={service} pagination={{ position: ['bottomCenter'] }} />,
        });
      } else {
        console.error('Error fetching service data:', response);
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  return (
    <>
      <IconButton icon={<EyeFilled />} onClick={handleViewServices} />
      {contextHolder}
    </>
  );
}