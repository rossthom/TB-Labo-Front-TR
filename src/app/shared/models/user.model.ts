import { Address, GpsPosition } from "src/app/gest-coop/shared/models/types.model"

export type UserView = {
    id: number
    first_name: string
    last_name: string
    birth_date: Date
    address: Address
    events_participation: number[]
    gps: GpsPosition
}

export type UserDtoNew = {
    first_name: string
    last_name: string
    email: string
    password: string
    birth_date: Date
    address: Address
    events_participation: number[]
    gps: GpsPosition
}