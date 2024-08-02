export const checkValidate=(email,password)=>{
    const isemail=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    if(!isemail)
        return "Email is not valid"
    const ispassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!ispassword)
        return "Password is not valid"

    return null;
}