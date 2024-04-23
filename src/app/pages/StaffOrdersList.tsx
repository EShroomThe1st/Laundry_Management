import { Key, useEffect, useState } from "react";
import { getAllOrder } from "../utils/api";
import { Table, TableProps } from "antd";
import { formatCurrency, paymentColor, statusColor } from "../utils/generators";
import { Order } from "../models/order";
import { CustomDropdown, CustomDropdownProps } from "../components/ui_staff/dropDown";

export default function StaffOrderList(){
  const [order, setOrder] = useState<Order[]>([]);

  const getAllOrderData = async () => {
    try {
      const response = await getAllOrder()
      if(response.success){
        setOrder(response.data);
      } else {
        console.error('Error fetching order data:', response)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllOrderData();
  }, []);

  const updateOrderAfter = () => {
    getAllOrderData();
  }

  const dropdownItems: CustomDropdownProps["items"] = [
    {
      key: "order",
      label: "View Order Detail"
    },
    {
      key: "user",
      label: "View User Detail"
    },
    {
      key: "update",
      label: "Update Order",
    },
    {
      key: "cancel",
      label: "Cancel Order",
      danger: true
    },
  ];

  const checkDisabled = (
    key: Key | undefined,
    record: Order,
  ): boolean => {
    const { order_status } = record;
    switch (key) {
      case "cancel":
        return order_status === "Canceled" || order_status === "Finished" ||order_status === "Ended";
      case "update":
        return order_status === "Canceled" || order_status === "Finished" ||order_status === "Ended";
      default:
        return false;
    }
  };

  const columns: TableProps<Order>['columns'] = [
    {
      title: 'Service Type',
      dataIndex: ['service', 'service_name'],
      key: 'service_name',
    },
    {
      title: 'Price',
      dataIndex: 'order_price',
      key: 'order_price',
      render: (order_price) => formatCurrency(order_price)
    },
    {
      title: 'Customer',
      dataIndex: ['user', 'full_name'],
      key: 'order_price',
      render: (order_price) => formatCurrency(order_price)
    },
    {
      title: 'Payment',
      align: "center",
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (payment_status) => (
        <span style={{ color: paymentColor(payment_status), fontWeight:"bold" }}>{payment_status}</span>
      )
    },
    {
      title: 'Status',
      align: "center",
      dataIndex: 'order_status',
      key: 'order_status',
      render: (order_status) => (
        <span style={{ color: statusColor(order_status), fontWeight:"bold" }}>{order_status}</span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <>
          <CustomDropdown items={dropdownItems} checkDisabled={checkDisabled} record={record} updateOrderAfter={updateOrderAfter}/>
        </>
      )
    }
  ]

  return(
    <>
    {/* <div className='w-full flex justify-end'>
    <CreateLaundryModal onUpdateLaundryPacks={updateLaundryPacks} />
    </div> */}
    <Table columns={columns} dataSource={order} pagination={{ position: ['bottomCenter'] }} />
    </>
  );
}