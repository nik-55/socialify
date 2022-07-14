import { NavigateFunction } from "react-router-dom"
import { clean_field, empty_validation } from "../../logic/extra"
import { set, database, ref, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "../../services/firebase"

//  This should be inside services > firebase > auth_service
// Use ES6 and TS as well.
function signup(user_interests:string[],navigate:NavigateFunction) {
    // don't use document.getElementById() in React
    const signup_email = document.getElementById("signup_email")! as HTMLInputElement
    const signup_password = document.getElementById("signup_password")! as HTMLInputElement
    const signup_username = document.getElementById("signup_username")! as HTMLInputElement
    // const signup_interest = document.getElementById("signup_interest")! as HTMLSelectElement;

    const validation: boolean = empty_validation([signup_email, signup_password, signup_username]);

    // let user_interests: string[] = [];
    // for (let i = 0; i < signup_interest.options.length; i++)
    //     if (signup_interest.options[i].selected) {
    //         user_interests.push(signup_interest.options[i].value);
    //         signup_interest.options[i].selected = false;
    //     }

    if (validation && user_interests.length !== 0) {
        createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
            .then((userCredential) => {

                const user_id = userCredential.user.uid;
                set(ref(database, 'socialify/users/' + user_id), {
                    username: signup_username.value,
                    uid: user_id,
                    interests: user_interests.sort(),
                    email : userCredential.user.email,
                });

                clean_field([signup_email, signup_password, signup_username]);
                console.log("Created Successfully");
                navigate({pathname:"/"})
            })
            .catch((error) => {
                alert(error.message);
            });

    }

    else alert("Cannot Leave Field Empty");
}



function login(navigate:NavigateFunction) {
        // don't use document.getElementById() in React
    const login_email = document.getElementById("login_email")! as HTMLInputElement
    const login_password = document.getElementById("login_password")! as HTMLInputElement

    const validation: boolean = empty_validation([login_email, login_password]);

    if (validation) {
        signInWithEmailAndPassword(auth, login_email.value, login_password.value)

            .then((userCredential) => {
                 // remove console.log before pushing to github
                console.log("Logged In as " + auth.currentUser?.email);
                clean_field([login_email, login_password]);
                navigate({ pathname: "/" })
            })

            .catch((error) => {
                alert(error.message);
            });
    }

    else alert("Cannot Leave Field Empty");
}

function signout(navigate:NavigateFunction) {
    try {
        console.log("Signing out...")
        signOut(auth);
        navigate({pathname:"/login"});
    }
    catch (error) { console.log(error); }
}

export { signup, login, signout }