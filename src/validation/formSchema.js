import * as yup from "yup";

const formSchema = yup.object({
  name: yup
    .string()
    .required("missing your name")
    .min(1, "name cannot be blank")
    .max(80, "invalid name"),
  email: yup
    .string()
    .email()
    .required("please enter your email")
    .max(80, "invalid email"),
  emailConsent: yup
    .bool()
    .oneOf([true], "please check box above in order to submit the form"),
  birthDate: yup.string().notRequired(),
});

export default formSchema;
