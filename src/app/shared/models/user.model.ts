import { Address, GpsPosition } from "src/app/openstreetmap/shared/models/types.model"

export type UserView = {
    id: number
    first_name: string
    last_name: string
    birth_date: Date
    address: Address
    events_participation: number[]
    gps: GpsPosition
}

export type UserDtoUpdParticipation = {
    id: number
    events_participation: number[]
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

export type UserLogin = {
    id: number
    email: string
    password: string
}