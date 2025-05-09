import './g3login.css'

export const G3Login = () => {
    return (
        <div className="inputGroup">
            <i className="fas fa-user form-group__icon"></i>
            <input placeholder=" " name="text" type="text"></input>
            <label htmlFor="username">Name</label>
        </div>
    )
}