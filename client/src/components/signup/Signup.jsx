import React, { useRef, useState } from "react";

//components
import { FormLayout } from "../layouts/form-layout/FormLayout";
import Input from "../reusable-form-elements/Input";
import Button from "../reusable-form-elements/Button";

//custom hooks
import { useMode } from "../../context/ModeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

//packages
import { Link, useNavigate } from "react-router-dom";

//css
import "./signup.css";

function Signup() {
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

    const { setlocalStorage } = useLocalStorage();

    //storing data into state
    const handleDataChange = (e) => {
        const value = e.target.value;
        const fieldName = e.target.name;
        setFormData({ ...formData, [fieldName]: value });
    };

    const { whiteMode } = useMode();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    //invoking signup function while pressing enter key
    const handleKeyDown = (e) => {
        if (e.key === 13) {
            if (validateFields()) {
                signup();
            }
        }
    };

    //handling error messages
    const validateFields = () => {
        const fields = Object.keys(formData);
        const errorObjCopy = { ...errors };
        fields.map((field) => {
            if (formData[field] === "") {
                errorObjCopy[field] = `${field} is required`;
            } else {
                errorObjCopy[field] = "";
            }

            //checking if email is valid when field is not empty
            if (field === "email") {
                if (
                    formData[field] !== "" &&
                    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData[field])
                ) {
                    errorObjCopy[field] = "invalid email";
                }
            }

            if (field === "password") {
                if (formData[field] !== "") {
                    if (formData[field].length < 6) {
                        errorObjCopy[field] = "password must be atleast 6 digits";
                    }
                }
            }
        });

        setErrors(errorObjCopy);

        if (Object.values(errorObjCopy).some((error) => error !== "")) {
            return false;
        }
        return true;
    };

    //signup function
    const signup = (e) => {
        e.preventDefault();

        if (validateFields()) {
            setlocalStorage("credentials", formData);
            navigate("/login", { replace: true });
            return;
        }
    };
    return (
        <FormLayout>
            <div className="top">
                <h1 className={whiteMode && "white-mode"}>Register</h1>
                <form
                    autoComplete="off"
                    onSubmit={signup}
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

                    <Button text={"Register"} />
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
        </FormLayout>
    );
}

export default Signup;
