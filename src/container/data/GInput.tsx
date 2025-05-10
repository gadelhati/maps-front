import { InputHTMLAttributes, useState } from "react"
import './GInput.css'

export const GInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const { name, resource, type, ...restProps } = props;
    const isPasswordField = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="inputGroup">
            <i className={resource}></i>
            <input {...restProps} type={isPasswordField ? (showPassword ? "text" : "password") : type} placeholder=" " name={name} id={name}></input>
            <label htmlFor={name}>{name}</label>
            {isPasswordField && (
                <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`} onClick={()=>setShowPassword(!showPassword)}></i>
            )}
        </div>
    )
}