/**
 * Created by ivetamakedonska on 12/16/16.
 */
export function validPass() {
  if(this.register.controls['password'].value.length >= 6) {
    return true;
  } else {
    return false;
  }
}

