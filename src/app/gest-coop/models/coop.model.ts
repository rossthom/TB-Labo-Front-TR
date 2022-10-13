import { IAddress } from "./address.model"
import { IEvent } from "./event.model"

export interface ICooperative {
    // Raw data
    id: number
    coop_type_id: number
    name: string
    description: string
    address: IAddress
    logo: string
    
    // Merged data
    coop_type_label: string
    /*events: IEvent[]*/
    
    // From 3rd Party API
    gps: {
        x: number
        y: number
    }
}
