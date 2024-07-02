import { RegistrationInterface } from "~/interfaces/interface";
import mongoose from "~/mongoose.server";

const RegistrationSchema = new mongoose.Schema({
    name : {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
    image: {
      require: true,
      type: String,
    },
})

let AdminRegistration : mongoose.Model<RegistrationInterface>

try {
    AdminRegistration = mongoose.model<RegistrationInterface>("adminRegistration")
} catch (error) {
    AdminRegistration = mongoose.model<RegistrationInterface>("adminRegistration", RegistrationSchema)

}

export default AdminRegistration