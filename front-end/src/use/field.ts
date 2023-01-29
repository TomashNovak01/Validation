//import { IFiled } from './../interfaces/IFiled';
import { ref, reactive, watch } from 'vue';

export function useField(field: object) {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});
  const touched = ref(false);

  const reassign = (val: object) => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((name: string) => {
      const isValid = field.validators[name](val);
      errors[name] = !isValid;
      if (!isValid) valid.value = false;
    });
  };

  watch(value, reassign);
  reactive(field.value);

  return { valid, value, errors, touched, blur: () => (touched.value = true) };
}
