import { json, redirect } from "@remix-run/node";
import Registration from "~/modal/registration";
import { commitSession, getSession } from "~/session";
import bcrypt from 'bcryptjs'; // Import bcrypt
import AdminRegistration from "~/modal/adminRegistration";
import StaffRegistration from "~/modal/staffRegistration";

class LoginController {
    async Registration(request: Request, name: string, email: string, password: string, base64Image: string) {
        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = await session.get("email")

            //checking if email does not exist
            const emailCheck = await Registration.findOne({ email: email });

            if (emailCheck) {
                return json({ message: "email already exist", success: false }, { status: 300 })
            }

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //saving the registration details
            const registratiion = new Registration({
                name,
                email,
                password: hashedPassword,
                image: base64Image
            })

            const response = await registratiion.save()

            if (response) {
                return json({ message: "Registration Successful", success: true }, { status: 200 })
            } else {
                return json({ message: "Unable to register user", success: false }, { status: 404 })
            }


        } catch (error) {
            return json({ message: "Somthing went wrong, Check your internet connection", success: false }, { status: 500 })
        }
    }

    async AdminRegistration(request: Request, name: string, email: string, password: string, base64Image: string) {
        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = await session.get("email")

            //checking if email does not exist
            const emailCheck = await AdminRegistration.findOne({ email: email });

            if (emailCheck) {
                return json({ message: "email already exist", success: false }, { status: 300 })
            }

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //saving the registration details
            const registratiion = new AdminRegistration({
                name,
                email,
                password: hashedPassword,
                image: base64Image
            })

            const response = await registratiion.save()

            if (response) {
                return json({ message: "Registration Successful", success: true }, { status: 200 })
            } else {
                return json({ message: "Unable to register user", success: false }, { status: 404 })
            }


        } catch (error) {
            return json({ message: "Somthing went wrong, Check your internet connection", success: false }, { status: 500 })
        }
    }
    async StaffRegistration(request: Request, name: string, email: string, password: string, base64Image: string) {
        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = await session.get("email")

            //checking if email does not exist
            const emailCheck = await StaffRegistration.findOne({ email: email });

            if (emailCheck) {
                return json({ message: "email already exist", success: false }, { status: 300 })
            }

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //saving the registration details
            const registratiion = new StaffRegistration({
                name,
                email,
                password: hashedPassword,
                image: base64Image
            })

            const response = await registratiion.save()

            if (response) {
                return json({ message: "Registration Successful", success: true }, { status: 200 })
            } else {
                return json({ message: "Unable to register user", success: false }, { status: 404 })
            }


        } catch (error) {
            return json({ message: "Somthing went wrong, Check your internet connection", success: false }, { status: 500 })
        }
    }
    

    async Login(request: Request, email: string, password: string) {
        try {
            //checking if user exist
            const userCheck = await Registration.findOne({ email: email });
            // decrypting the password
            if (userCheck && await bcrypt.compare(password, userCheck.password)) {
                const session = await getSession(request.headers.get("Cookie"));
                session.set("email", email);

                // Redirect to a protected route or home page after successful login
                return redirect("/user", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },

                });
            }else{
                return json({message:"Invalid email or password", success:false}, {status:400})
            }
        } catch (error) {
            return json({message:"somthing went wrong, check your connection", success: false}, {status:200})
        }
    }
    async AdminLogin(request: Request, email: string, password: string) {
        try {
            //checking if user exist
            const userCheck = await AdminRegistration.findOne({ email: email });
            // decrypting the password
            if (userCheck && await bcrypt.compare(password, userCheck.password)) {
                const session = await getSession(request.headers.get("Cookie"));
                session.set("email", email);

                // Redirect to a protected route or home page after successful login
                return redirect("/admin", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },

                });
            }else{
                return json({message:"Invalid email or password", success:false}, {status:400})
            }
        } catch (error) {
            return json({message:"somthing went wrong, check your connection", success: false}, {status:200})
        }
    }
    async StaffLogin(request: Request, email: string, password: string) {
        try {
            //checking if user exist
            const userCheck = await StaffRegistration.findOne({ email: email });
            // decrypting the password
            if (userCheck && await bcrypt.compare(password, userCheck.password)) {
                const session = await getSession(request.headers.get("Cookie"));
                session.set("email", email);

                // Redirect to a protected route or home page after successful login
                return redirect("/staff", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },

                });
            }else{
                return json({message:"Invalid email or password", success:false}, {status:400})
            }
        } catch (error) {
            return json({message:"somthing went wrong, check your connection", success: false}, {status:200})
        }
    }
}

const login = new LoginController;
export default login;