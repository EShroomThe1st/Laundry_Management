export interface Order{
  order_id: string,
  order_status: string,
  payment_status: string,
  order_price: number,
  user: {
      user_id: string,
      full_name: string
  },
  service: {
      service_id: string,
      service_name: string,
  }
}

export interface OrderDetail{
  order_status: string,
  order_price: number,
  user: {
      user_id: string
      full_name: string
  },
  service: {
      service_id: string
      service_name: string,
      service_price: number
  },
  service_type: {
      service_type_id: string,
      service_type_name: string
  },
  laundry_pack: {
      laundry_pack_id: string
      laundry_pack_name: string,
      laundry_pack_price: number
  },
  order_progress: [
      {
          order_status: string,
          timestamp: string
      },
  ]
}