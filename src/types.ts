import { User } from "firebase/auth"
type userDetails={
    username: string,
    uid: string,
    interests: string[],
    email : string,
}
type props={
    userDetails?: userDetails,
    user:User
}

export type {props,userDetails}