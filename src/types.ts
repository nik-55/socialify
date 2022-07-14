// Put these inside a folder and then distibute them into files according to use case.

import { User } from "firebase/auth"
type userDetails={
    username: string,
    uid: string,
    interests: string[],
    email : string,
}

//Variable Names should make sense.
type props={
    userDetails?: userDetails,
    user:User
}

export type {props,userDetails}