import { Address, GpsPosition } from "./types.model"

export interface IEvent {
    // Raw data
    id: number
    coop_id: number
    event_type_id: number
    name: string
    description: string
    lieu: string
    address: Address
    datetime_start: Date
    datetime_end: Date
    nb_people_min: number
    nb_people_max: number
    
    // Merged data
    event_type_label: string
    
    // From 3rd Party API
    gps: GpsPosition
}