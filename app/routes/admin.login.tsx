import { Button, Checkbox, Input } from "@nextui-org/react";
import { ActionFunction } from "@remix-run/node";
import { Form, Link, Links, useActionData } from "@remix-run/react";
import { useTheme } from "next-themes"
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { LockIcon } from "~/components/icons/LockIcon";
import { MailIcon } from "~/components/icons/MailIcon";
import { errorToast, successToast } from "~/components/toast";
import login from "~/controllers/loginController";

const Login = () => {
    const { theme, setTheme } = useTheme();
    const actionData = useActionData<any>()

    useEffect(() => {
        if(actionData){
            if(actionData.success){
                successToast(actionData.message)
            }else{
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    return (
        <div className={`lg:grid lg:grid-cols-2 ${theme === "dark" ? "bg-slate-950" : "bg-slate-gray-200"}`}>
            <Toaster position="top-center"/>
            <div className="h-[100vh] w-full flex flex-col items-center justify-center">
                <p className="font-poppins text-5xl ">Login To </p>
                <p className="font-poppins text-5xl  mt-2">Admin Dashboard </p>
                <Form method="post" className="mt-20">
                    <Input
                        name="email"
                        isRequired
                        isClearable
                        type="email"
                        placeholder="example@gmail.com"
                        classNames={{
                            inputWrapper: "w-[90vw] lg:w-[30vw] text-sm font-poppins h-16 bg-opacity-70"
                        }}
                        startContent={
                            <MailIcon className="w-6 h-6 text-gray-500" />
                        }
                    />
                    <Input
                        name="password"
                        isRequired
                        isClearable
                        type="password"
                        className="mt-4"
                        placeholder="*******************"
                        classNames={{
                            inputWrapper: "w-[90vw] lg:w-[30vw] text-sm font-poppins h-16 bg-opacity-70"
                        }}
                        startContent={
                            <LockIcon className="w-6 h-6 text-gray-500" />
                        }
                    />

                    <div className="flex justify-between mt-4">
                        <Checkbox>Remember me</Checkbox>
                        <Link to=""><p>Forgot password?</p></Link>
                    </div>

                    <button className="w-[90vw] bg-primary rounded-lg lg:w-[30vw] h-16 mt-10 text-xl font-poppins">Login</button>

                    <p className="text-xl text-center mt-4 font-poppins">OR</p>

                    <div className="rounded-lg  h-16 mt-6 flex items-center justify-center">
                        <button className="text-xl font-poppins w-[90vw] bg-primary rounded-lg  lg:w-[30vw] h-16">Login with Google</button>
                    </div>

                    <p className="text-md font-poppins text-center mt-10">Do not have an account <Link to="/admin/registration"><span className="text-primary">Sign Up</span></Link></p>

                </Form>
            </div>
            <div className="h-[100vh] hidden lg:block md:block w-full">
                <p>Login image comes here</p>
            </div>
        </div>
    )
}

export default Login

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const signin = await login.AdminLogin(request, email, password)

    return signin
}