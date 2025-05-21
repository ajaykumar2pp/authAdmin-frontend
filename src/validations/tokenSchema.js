import * as yup from "yup";

export const tokenSchema = yup.object().shape({
  token: yup.string().length(6, "Token must be 6 digits").required("Token is required"),
});