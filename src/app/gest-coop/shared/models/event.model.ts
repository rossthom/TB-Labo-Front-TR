import { Address, GpsPosition } from "src/app/openstreetmap/shared/models/types.model"
import { Category } from "./types.model"

export type EventView = {
    id: number
    coop_id: number
    event_typeId: number
    event_type: Category
    name: string
    description: string
    location: string
    address: Address
    datetime_start: Date
    datetime_end: Date
    nb_people_min: number
    nb_people_max: number
    gps: GpsPosition
}

export type EventDtoUpd = {
    id: number
    coop_id: number
    event_typeId: number
    name: string
    description: string
    location: string
    address: Address
    datetime_start: Date
    datetime_end: Date
    nb_people_min: number
    nb_people_max: number
    gps: GpsPosition
}

export type EventDtoNew = {
    coop_id: number
    event_typeId: number
    name: string
    description: string
    location: string
    address: Address
    datetime_start: Date
    datetime_end: Date
    nb_people_min: number
    nb_people_max: number
    gps: GpsPosition
}
