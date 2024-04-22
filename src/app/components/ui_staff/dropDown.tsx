import {
  EllipsisOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import { Key } from "react";
import { Laundry } from "~/app/models/laundry";

export type CustomDropdownProps = {
  items: {
    key: Key;
    label: React.ReactNode;
    disabled?: boolean;
    dashed?: boolean;
    type?: "item" | "divider";
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }[];
  record: Laundry;
};

export function CustomDropdown({
  items,
  record,
}: CustomDropdownProps) {
  const [modal, contextHolder] = Modal.useModal();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    const { key } = e;
    switch (key) {
      case "update": {

        break;
      }
      case "delete": {
        modal.confirm({
          title: "Are you sure",
          icon: <ExclamationCircleFilled />,
          content: <div>Do you want to delete {record.laundry_pack_name}</div>,
          okText: "Confirm",
          okType: "danger",
          cancelText: "Cancel",
          onOk() {
            console.log(`${key}: ${record.laundry_pack_id}`);
          },
          onCancel() {},
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            ...item,
          })),
          onClick: (e) => onMenuClick(e),
        }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <EllipsisOutlined />
      </Dropdown>
      {contextHolder}
    </>
  );
}
