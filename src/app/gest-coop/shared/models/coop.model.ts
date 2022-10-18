import { Address, GpsPosition } from "src/app/openstreetmap/shared/models/types.model"
import { Category } from "./types.model"

export type CooperativeView = {
    id: number
    coop_typeId: number
    coop_type: Category
    name: string
    email: string
    description: string
    address: Address
    logo: string
    gps: GpsPosition
}


export type CooperativeDtoUpd = {
    id: number
    coop_typeId: number
    name: string
    description: string
    address: Address
    logo: string
    gps: GpsPosition
}

export type CooperativeDtoNew = {
    coop_typeId: number
    name: string
    email: string
    password: string
    description: string
    address: Address
    logo: string
    gps: GpsPosition
}


export type CooperativeLogin = {
    id: number
    email: string
    password: string
}