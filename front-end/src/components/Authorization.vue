<template>
  <form class="card" @submit.prevent="submit">
    <div class="container">
      <h1>Authorization</h1>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email.value" @blur="form.email.blur" />
        <small v-if="form.email.touched && form.email.errors.required">Email filed is required.</small>
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password.value" @blur="form.password.blur" />
        <small v-if="form.password.touched && form.password.errors.required">Password filed is required.</small>
        <small v-if="form.password.touched && form.password.errors.minLength">
          Password length can't be less then 8. Now it is {{ form.password.value.length }}.
        </small>
      </div>

      <button class="btn primary" type="submit" :disabled="!form.valid">Submit</button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, onErrorCaptured } from "vue";
import { useForm } from "@/use/form";

const required: Function = (val: string) => !!val;
const minLength: Function = (num: number) => (val: string) => val.length >= num;

export default {
  setup() {
    const submitted = ref(false);
    const error = ref();
    const form: object = useForm({
      email: {
        value: "",
        validators: { required },
      },
      password: {
        value: "",
        validators: { required, minLength: minLength(8) },
      },
    });

    function submit() { submitted.value = true };
    onErrorCaptured(e => { error.value = e.message });

    return { form, submit, submitted, error };
  },
};
</script>
