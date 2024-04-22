import { useEffect, useState } from "react";
import { getAllLaundryPack } from "../utils/api";
import { Laundry } from "../models/laundry";
import { Table, TableProps } from "antd";
import CreateLaundryModal from "../components/ui_staff/createLaundry";
import DeleteLaundry from "../components/ui_staff/deleteLaundry";
import { formatCurrency } from "../utils/generators";

export default function StaffLaundryPackList(){
  const [laundryPacks, setLaundryPacks] = useState<Laundry[]>([]);

  const getLaundryPackData = async () => {
    try {
      const response = await getAllLaundryPack()
      if(response.success){
        setLaundryPacks(response.data);
      } else {
        console.error('Error fetching users data:', response)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getLaundryPackData();
  }, []);

  const updateLaundryPacks = () => {
    getLaundryPackData();
  }

  const columns: TableProps<Laundry>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'laundry_pack_name',
      key: 'laundry_pack_name',
    },
    {
      title: 'Price',
      dataIndex: 'laundry_pack_price',
      key: 'laundry_pack_price',
      render: (laundry_pack_price) => formatCurrency(laundry_pack_price)
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <>
          <DeleteLaundry record={record} onUpdateLaundryPacks={updateLaundryPacks}/>
        </>
      )
    }
  ]

  return(
    <>
    <div className='w-full flex justify-end'>
    <CreateLaundryModal onUpdateLaundryPacks={updateLaundryPacks} />
    </div>
    <Table columns={columns} dataSource={laundryPacks} pagination={{ position: ['bottomCenter'] }} />
    </>
  );
}