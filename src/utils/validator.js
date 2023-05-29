import * as Yup from "yup"

export const AddressSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required(" Last name is required"),
  company: Yup.string().optional(),
  address_1: Yup.string().required("Address is required"),
  address_2: Yup.string().optional(),
  postal_code: Yup.string().required("Postal code is required"),
  city: Yup.string().required("City is required"),
  country_code: Yup.string().required("Country is required"),
  type: Yup.string().required("Address type is required"),
  email: Yup.string().email("Not a valid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
})

export const ContactSchema = Yup.object({
  email: Yup.string().email("Not a valid email").required("Required"),
})

export const ShippingSchema = Yup.object({
  option_id: Yup.string().required("You must select a shipping option"),
})

export const Validator = Yup.object({
  contact: ContactSchema,
  address: AddressSchema,
  shipping: ShippingSchema,
})

export const DiscountSchema = Yup.string().required("Required")
