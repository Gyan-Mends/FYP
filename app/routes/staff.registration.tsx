import { Button, Checkbox, Input, User } from "@nextui-org/react";
import { ActionFunction } from "@remix-run/node";
import { Form, Link, Links, useActionData } from "@remix-run/react";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { LockIcon } from "~/components/icons/LockIcon";
import { MailIcon } from "~/components/icons/MailIcon";
import UserIcon from "~/components/icons/UserIcon";
import login from "~/controllers/loginController";
import { Toaster } from 'react-hot-toast';
import { errorToast, successToast } from "~/components/toast";


const Login = () => {
    const { theme, setTheme } = useTheme();
    const [submit, setSubmit] = useState("Submit")
    const actionData = useActionData<any>();
    const [base64Image, setBase64Image] = useState()

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    return (
        <div className={`lg:grid lg:grid-cols-2 h-[100vh] w-full ${theme === "dark" ? "bg-slate-950" : "bg-slate-gray-200"}`}>
            <Toaster position="top-center" />

            <div className="flex flex-col items-center justify-center pt-20 lg:pt-0">
                <p className="font-poppins text-5xl ">Staff Registration </p>
                <div>
                    <Form method="post" className="mt-20">
                        <Input
                            isClearable
                            isRequired
                            type="text"
                            name="name"
                            placeholder="Mends Gyan"
                            classNames={{
                                inputWrapper: "w-[90vw] lg:w-[30vw] text-sm font-poppins h-16 bg-opacity-70"
                            }}
                            startContent={
                                <UserIcon className="w-6 h-6 text-gray-500" />
                            }
                        />
                        <Input
                            isClearable
                            isRequired
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            classNames={{
                                inputWrapper: "w-[90vw] lg:w-[30vw] text-md font-poppins h-16 bg-opacity-70 mt-4"
                            }}
                            startContent={
                                <MailIcon className="w-6 h-6 text-gray-500" />
                            }
                        />
                        <Input
                            isClearable
                            isRequired
                            type="text"
                            name="password"
                            placeholder="*******************"
                            classNames={{
                                inputWrapper: "w-[90vw] lg:w-[30vw] text-sm font-poppins h-16 bg-opacity-70 mt-4"
                            }}
                            startContent={
                                <LockIcon className="w-6 h-6 text-gray-500" />
                            }
                        />

                        <div>
                            <input className="w-[90vw] lg:w-[30vw] h-16 mt-4 bg-default-100 outline-none rounded-lg bg-opacity-70" type="file" name="image" onChange={(event:any) => {
                                const file = event.target.files[0]
                                if(file){
                                    const reader =  new FileReader()
                                    reader.onloadend = () => {
                                        setBase64Image(reader.result)
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }}/>
                            {base64Image &&(
                                <div className="h-40 w-40 rounded-lg mt-2">
                                    <img className="h-40 w-40 rounded-lg" src={base64Image} alt="" />
                                </div>
                            )}

                            <input  type="hidden" name="base64Image" value={base64Image} />
                        </div>
                        <button  className="w-[90vw] lg:w-[30vw] bg-primary rounded-lg h-16 mt-10 text-2xl lg:text-xl font-poppins">Submit</button>

                        <p className="text-md font-poppins text-center mt-10">Already have an account <Link to="/staff/login"><span className="text-primary">Login</span></Link></p>


                    </Form>
                </div>
            </div>
            <div className=" hidden lg:block md:block w-full">
                <p>Login image comes here</p>
            </div>
        </div>
    )
}

export default Login

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const base64Image = formData.get("base64Image") as string

    const registration = await login.StaffRegistration(request, name, email, password, base64Image);

    return registration
}