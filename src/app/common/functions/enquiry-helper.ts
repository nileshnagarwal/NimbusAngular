import { Enquiry } from '../interfaces/enquiry';
import { of } from 'rxjs';

export class EnquiryHelper {

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

    static getCursor(response) {
      const next = response.body['next'];
          console.log('next: ', next);
          if (next) {
            const searchParams = new URLSearchParams(next.toString().split('?')[1]);
            console.log('searchParams: ', searchParams);
            console.log(searchParams.get('cursor'));
            const cursor = searchParams.has('cursor') ? of(searchParams.get('cursor')) : of(null);
            console.log('Cursor: ', cursor);
            return cursor;
          } else return of(null);
    }

}
