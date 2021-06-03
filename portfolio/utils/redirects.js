
export const authRedirect = () => {

    if(localStorage.getItem("auth-token")){
       window.location.assign("/");
    }
}

