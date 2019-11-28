import { Enquiry } from '../interfaces/enquiry';

export class EnquiryCardHelper {

    static getLocality(enquiry: Enquiry, src_dest) {
        // Check if source or destination
        if (src_dest === 'source') {
          // If sublocality_level_1 is not null return it
          if (enquiry.places_source_obj[0]['sublocality_level_1'] != null) {
            return enquiry.places_source_obj[0]['sublocality_level_1'];
          // Else check if locality is defined, return it
          } else if (enquiry.places_source_obj[0]['locality'] != null) {
            return enquiry.places_source_obj[0]['locality'];
          // Else return administrative_level_2 which is district
          } else return enquiry.places_source_obj[0]['administrative_area_level_2'];
        // Same as source algo
        } else if (src_dest === 'destination') {
          if (enquiry.places_destination_obj[0]['sublocality_level_1'] != null) {
            return enquiry.places_destination_obj[0]['sublocality_level_1'];
          } else if (enquiry.places_destination_obj[0]['locality'] != null) {
            return enquiry.places_destination_obj[0]['locality'];
          } else return enquiry.places_destination_obj[0]['administrative_area_level_2'];
        } else return null;
    }

    static getVehicleIcon(vehicleType) {
        if (vehicleType) {
            return '..\\..\\..\\..\\assets\\images\\' + vehicleType.toString() + '.png';
        } else return null;
    }

}
