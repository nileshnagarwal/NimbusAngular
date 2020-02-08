export const userTypeOpt = {
    'developer': 1,
    'admin': 2,
    'sales': 3,
    'trafficIncharge': 4,
    'accounts': 5,
};

export const enquiryStatusOpt = {
    'FloatedEnquiry': 'Floated Enquiry',
    'UnfloatedEnquiry': 'Unfloated Enquiry',
    'FinalisedOrder': 'Confirmed Order',
};

export class LoadTypeOptions {

    odc = 'ODC';
    normal = 'Normal';
    container = 'Container';
    part = 'Part';
    odcContainer = 'ODC Container';
    ftl = 'FTL';
    ltl = 'LTL';

    loadTypeOptionValues = {
        [this.odc]: 1,
        [this.normal]: 2,
        [this.container]: 3,
        [this.part]: 4,
        [this.odcContainer]: 5,
    };
}

export const pageSize = 20;
