export interface LR {
    lr_no: number;
    client_id: number;
    vehicle_no?: string;
    verification_no?: string;
    date?: Date;
    dispatch_from?: string;
    ship_to?: string;
    consignor_id?: number;
    consignee_id?: number;
    consignor_manual?: string;
    consignee_manual?: string;
    invoice_no?: string;
    invoice_date?: string;
    dc_no?: string;
    dc_date?: string;
    boe_no?: string;
    boe_date?: string;
    value?: string;
    ewaybill_no?: string;
    comment?: string;
    size?: string;
    weight?: string;
}
