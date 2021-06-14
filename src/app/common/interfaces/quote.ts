import { Enquiry } from './enquiry';

export interface Quote {
    quote_id?: number;
    enquiry_id: number;
    transporter_id: number;
    freight_normal?: number;
    freight_incl?: number;
    freight_excl?: number;
    vehicle_avail: string;
    vehicle_type_id: number[];
    vehicle_body_id?: number[];
    user_id: number;
    comments: string;

    /** Below are additional read_only fields
     * received using get request*/
    transporter_str?: string;
    enquiry_no?: string;
    places_source?: string[];
    places_destination?: string[];
    enquiry?: Enquiry;
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    freight_normal_org?: number;
    freight_incl_org?: number;
    freight_excl_org?: number;
    freight_normal_rev?: number;
    freight_incl_rev?: number;
    freight_excl_rev?: number;
    vehicle_type_obj?: Object[];
}


