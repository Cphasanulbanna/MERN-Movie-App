import React, { useEffect, useRef, useState } from "react";

//css
import "./forget-password.css";

//packages
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//resusable components
import { FormLayout } from "../layouts/form-layout/FormLayout";
import Input from "../reusable-form-elements/Input";
import Button from "../reusable-form-elements/Button";

//custom hook
import { useMode } from "../../context/ModeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    //form fields state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    //error message state
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    //reset password function
    const resetPassword = (e) => {
        e.preventDefault();

        if (validateFields()) {
            notify();
            setlocalStorage("credentials", formData);
            return;
        }
    };

    //success message for password change
    const notify = () => toast.success("Password changed successfully");

    const { whiteMode } = useMode();
    const { setlocalStorage, getlocalStorage } = useLocalStorage();
    const inputRef = useRef(null);

    //fetching email[credential] from localstorage
    useEffect(() => {
        const credentials = getlocalStorage("credentials");
        setEmail(credentials?.email);
    }, []);

    //handling error messages
    const validateFields = () => {
        const fields = Object.keys(formData);
        const errorObjCopy = { ...errors };
        fields.map((field) => {
            if (formData[field] === "") {
                errorObjCopy[field] = `${field} is required`;
            } else if (formData[field]) {
                //checking if email is valid when field is not empty
                if (field === "email") {
                    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData[field])) {
                        errorObjCopy[field] = "Invalid email";
                    } else if (formData[field] !== email) {
                        errorObjCopy[field] = "Email does not match";
                    } else {
                        errorObjCopy[field] = "";
                    }
                }

                //checking if password is valid when field is not empty
                if (field === "password") {
                    if (formData[field].length < 6) {
                        errorObjCopy[field] = "password must be atleast 6 digits";
                    } else {
                        errorObjCopy[field] = "";
                    }
                }
            } else {
                errorObjCopy[field] = "";
            }
        });

        setErrors(errorObjCopy);

        if (Object.values(errorObjCopy).some((error) => error !== "")) {
            return false;
        }
        return true;
    };

    //storing data into state
    const handleDataChange = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        setFormData({ ...formData, [fieldName]: value });
    };

    //invoking signup function while pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === 13) {
            if (validateFields()) {
                resetPassword();
            }
        }
    };
    return (
        <FormLayout>
            <div className="top">
                <h1 className={whiteMode && "white-mode"}>Reset Password</h1>
                <form
                    autoComplete="off"
                    onSubmit={resetPassword}
                    className="login-form"
                >
                    <Input
                        formData={formData}
                        handleDataChange={handleDataChange}
                        errors={errors.email}
                        type={"text"}
                        name="email"
                        inputRef={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    <Input
                        formData={formData}
                        handleDataChange={handleDataChange}
                        errors={errors.password}
                        type={"password"}
                        name="password"
                        onKeyDown={handleKeyDown}
                        placeholder={"New Password"}
                    />

                    <Button text={"Reset Password"} />
                </form>
            </div>
            <p className={whiteMode && "white-mode"}>
                Already registered{" "}
                <Link
                    to={"/login"}
                    className={whiteMode && "white-mode"}
                >
                    Login now.
                </Link>
            </p>
            <ToastContainer />
        </FormLayout>
    );
}

export default ForgetPassword;
