import { useEffect, useState } from "react";
import { getAllServiceType } from "../utils/api";
import { Table, TableProps } from "antd";
import { ServiceType } from "../models/service";
import CreateNewServiceType from "../components/ui_staff/createServiceType";
import DeleteServiceType from "../components/ui_staff/deleteServiceType";
import ViewServiceType from "../components/ui_staff/viewService";

export default function StaffServicetTypeList(){
  const [serviceType, setServiceType] = useState<ServiceType[]>([]);

  const getServiceTypeData = async () => {
    try {
      const response = await getAllServiceType()
      if(response.success){
        setServiceType(response.data);
      } else {
        console.error('Error fetching users data:', response)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getServiceTypeData();
  }, []);

  const updateServiceType = () => {
    getServiceTypeData();
  }

  const columns: TableProps<ServiceType>['columns'] = [
    {
      title: 'Service Type',
      dataIndex: 'service_type_name',
      key: 'laundry_pack_name',
    },
    {
      title: "View Services",
      align:"center",
      render: (_,record) => (
        <ViewServiceType record={record}/>
      )
    },
    {
      title: "Delete",
      align: "center",
      render: (_, record) => (<DeleteServiceType record={record} onUpdateServiceType={updateServiceType}/>)

    }
  ]

  return(
    <>
    <div className='w-full flex justify-end'>
    <CreateNewServiceType onUpdateServiceType={updateServiceType} />
    </div>
    <Table columns={columns} dataSource={serviceType} pagination={{ position: ['bottomCenter'] }} />
    </>
  );
}