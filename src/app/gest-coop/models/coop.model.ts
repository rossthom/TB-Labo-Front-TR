import { Address, GpsPosition } from "./types.model"
import { IEvent } from "./event.model"

export interface ICooperative {
    // Raw data
    id: number
    coop_type_id: number
    name: string
    description: string
    address: Address
    logo: string
    
    // Merged data
    coop_type_label: string
    /*events: IEvent[]*/
    
    // From 3rd Party API
    gps: GpsPosition
}
