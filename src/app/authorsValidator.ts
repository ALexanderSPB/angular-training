import { AbstractControl } from '@angular/forms';

export default (control: AbstractControl): {[key: string]: any} | null => {
  return control.value.length ? null : { noAuthors: { value: control.value }};
}
