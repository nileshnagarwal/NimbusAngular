import { LrService } from './../services/operations/lr.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export const lrUniqueCheck = (service: LrService) => {
    return (control: FormControl) => {
        return service.lrUniqueCheck(control.value)
            .pipe(map(res => {
                return res.body ? null : {lrEngaged : true};
            }));
    };
};
