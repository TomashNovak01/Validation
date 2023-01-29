import { computed, reactive } from 'vue';
import { useField } from '@/use/field';

export function useForm(init: object = {}) {
  const form: object = reactive({});
  const validKey: string = 'valid';

  for (const [key, value] of Object.entries(init)) form[key] = useField(value);

  const withoutValid = (k: string) => k !== validKey;

  form[validKey] = computed(() =>
    Object.keys(form)
      .filter(withoutValid)
      .every((k) => form[k].valid),
  );

  return form;
}
