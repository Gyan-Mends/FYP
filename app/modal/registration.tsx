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

let Registration : mongoose.Model<RegistrationInterface>

try {
  Registration = mongoose.model<RegistrationInterface>("registration")
} catch (error) {
  Registration = mongoose.model<RegistrationInterface>("registration", RegistrationSchema)

}

export default Registration