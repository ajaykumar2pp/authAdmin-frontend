import * as yup from "yup";

export const adminSchema = yup.object({
    name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name is too long")
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Only alphabets with single spaces allowed")
        .required("Name is required"),

    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

    phone: yup
        .string(),

    address: yup
        .string()
        .min(4, "Address must be at least 4 characters")
        .max(100, "Address is too long")
        .matches(
            /^[A-Za-z0-9\s,.'\-\/#]+$/,
            "Address can only contain letters, numbers, commas, periods, hyphens, slashes, and hashes"
        )
        .required("Address is required"),
});