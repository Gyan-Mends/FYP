import { RegistrationInterface } from "~/interfaces/interface";
import mongoose from "~/mongoose.server";

const StaffRegistrationSchema = new mongoose.Schema({
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

let StaffRegistration : mongoose.Model<RegistrationInterface>

try {
    StaffRegistration = mongoose.model<RegistrationInterface>("staffRegistration")
} catch (error) {
    StaffRegistration = mongoose.model<RegistrationInterface>("staffRegistration", StaffRegistrationSchema)

}

export default StaffRegistration