export interface Laundry{
  laundry_pack_id: string,
  laundry_pack_name: string,
  laundry_pack_price: number,
}

export interface CreateLaundry{
  new_laundry_pack_name: string,
  new_laundry_pack_price: number,
}
