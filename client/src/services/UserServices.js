import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function doLogin2(event) {}

export async function doLogin(event) {
    event.preventDefault();
    console.log(event.password);

    let obj = { email: email.value, password: password.value };

    try {
        const response = await fetch(
            `http://localhost:5001/api/users/?email=${obj.email}&password=${obj.password}`
        );
        let res = JSON.parse(await response.text());

        if (res.error === "No Such Records") {
            setWarning(true);
        } else {
            setWarning(false);
            let user = {
                firstName: res.firstName,
                lastName: res.lastName,
                tags: res.tags,
                id: res.id,
            };
            localStorage.setItem("user_data", JSON.stringify(user));
            navigation("texteditor");
        }
    } catch (e) {
        console.log(e.toString());
        return;
    }
}

export async function registerUser() {}

export async function updateUser() {}

export async function deleteUser() {}
