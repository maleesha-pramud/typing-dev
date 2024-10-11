"use server"

export async function login(formData: FormData) {
    "use server"
    console.log(formData.get("name"))
    return {
        message: "success",
        data: {
            name: formData.get("name")
        }
    }
}