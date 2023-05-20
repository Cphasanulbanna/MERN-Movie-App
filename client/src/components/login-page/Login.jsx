import React, { useEffect, useRef, useState } from "react";

//css
import "./login.css";

//packages
import { Link, useNavigate } from "react-router-dom";

//custom hooks
import { useMode } from "../../context/ModeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

//components
import { FormLayout } from "../layouts/form-layout/FormLayout";
import Input from "../reusable-form-elements/Input";
import Button from "../reusable-form-elements/Button";

function Login() {
    const [credentials, setCredentials] = useState(null);
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

    //credentials from localStorage
    useEffect(() => {
        const credentials = getlocalStorage("credentials");
        setCredentials(credentials);
    }, []);

    //login function
    const login = (e) => {
        e.preventDefault();

        const token = generateRandomToken();
        if (validateFields()) {
            setlocalStorage("user_data", token);
            navigate("/", { replace: true });
            return;
        }
    };

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const { whiteMode } = useMode();

    //userdata[token] from local storage
    const { setlocalStorage, getlocalStorage } = useLocalStorage();

    //storing data into state
    const handleDataChange = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        setFormData({ ...formData, [fieldName]: value });
    };

    //generating random token while login
    const generateRandomToken = () => {
        const randomString1 = Math.random().toString(36).substring(7);
        const randomString2 = Math.random().toString(36).substring(7);
        const randomString3 = Math.random().toString(36).substring(7);
        if (formData?.email !== "" && formData?.password !== "") {
            return `${randomString1}${formData?.email}${randomString2}${formData?.password}${randomString3}`;
        }
    };

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
                    } else if (formData[field] !== credentials?.email) {
                        errorObjCopy[field] = "Incorrect email";
                    } else {
                        errorObjCopy[field] = "";
                    }
                }

                //checking if password is valid when field is not empty
                if (field === "password") {
                    if (formData[field].length < 6) {
                        errorObjCopy[field] = "password must be atleast 6 digits";
                    } else if (formData[field] !== credentials?.password) {
                        errorObjCopy[field] = "Incorrect password";
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

    //invoking login function while pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === 13) {
            if (validateFields()) {
                login();
            }
        }
    };

    return (
        <FormLayout>
            <div className="top">
                <h1 className={whiteMode && "white-mode"}>Sign In</h1>
                <form
                    autoComplete="off"
                    onSubmit={login}
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
                    />

                    <Button text={"Sign In"} />
                    <Link
                        to={"/reset-password"}
                        className={`forgot-password ${whiteMode && "white-mode"}`}
                    >
                        Forgot Pasword?
                    </Link>
                </form>
            </div>
            <p className={whiteMode && "white-mode"}>
                New to Debug Media?{" "}
                <Link
                    to={"/signup"}
                    className={whiteMode && "white-mode"}
                >
                    {" "}
                    Sign up now.
                </Link>
            </p>
        </FormLayout>
    );
}

export default Login;
