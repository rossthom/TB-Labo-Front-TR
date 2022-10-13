import { Address, Category, GpsPosition } from "./types.model"

export interface ICooperative {
    // Raw data
    id: number
    coop_typeId: number
    coop_type: Category
    name: string
    description: string
    address: Address
    logo: string

    // From 3rd Party API
    gps: GpsPosition
}


export type CooperativeDto = {
    // Raw data
    id: number
    coop_type_id: number
    name: string
    description: string
    address: Address
    logo: string

    // From 3rd Party API
    gps: GpsPosition
}
