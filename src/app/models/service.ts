export interface ServiceType {
  service_type_id: string
  service_type_name: string
}

export interface Service {
  service_id: string
  service_name: string
  service_price: string
}

export interface CreateServiceType {
  service_type_name: string
}

export interface CreateService {
  service_type_id: string
  service_name: string
  service_price: number
}
