import { Address, Category, GpsPosition } from "./types.model"

export interface IEvent {
    // Raw data
    id: number
    coop_id: number
    event_typeId: number
    event_type: Category
    name: string
    description: string
    lieu: string
    address: Address
    datetime_start: Date
    datetime_end: Date
    nb_people_min: number
    nb_people_max: number
    
    // From 3rd Party API
    gps: GpsPosition
}