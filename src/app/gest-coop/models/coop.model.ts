import { Address, Category, GpsPosition } from "./types.model"

export interface ICooperative {
    id: number
    coop_typeId: number
    coop_type: Category
    name: string
    description: string
    address: Address
    logo: string
    gps: GpsPosition
}

export type CooperativeDto = {
    // Same, without coop_type
    id: number
    coop_typeId: number
    name: string
    description: string
    address: Address
    logo: string
    gps: GpsPosition
}
