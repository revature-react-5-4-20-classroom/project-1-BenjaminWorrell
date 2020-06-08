import axios from "axios";
import { User } from "../models/User";
import { basename } from "path";
import { Reimbursement } from "../models/Reimbursements";

const backendClient = axios.create({
    baseURL: "http://34.239.172.44:2500",
    withCredentials: true,
})

export async function getAllUsers(): Promise<User[]>{
    const response = await backendClient.get("/users");
    return response.data.map((userObj: any)=>{
        const {id, username, password, firstName, lastName, email, role} = userObj;
        return new User(id, username, password, firstName, lastName, email, role)
    })
}

export async function login(un: string, pw: string): Promise<User>{
    try{
        console.log("In the backend client log in function");
        const response = await backendClient.post("/login", {username: un, password: pw});
        const {id, username, password, firstName, lastName, email, role} = response.data;
        return new User(id, username, password, firstName, lastName, email, role)
    }
    catch(e){
        if(e.response.status===401){
            throw new Error(`Failed to authenticate with username: ${un}`);
        }
        else{
            throw new Error("There was a problem logging in");
        }
    }
}

export async function getUserById(id: number): Promise<User[]>{
    const response = await backendClient.get(`/users/${id}`);
    return response.data.map((userObj: any)=>{
        const {id, username, password, firstName, lastName, email, role} = userObj;
        return new User(id, username, password, firstName, lastName, email, role)
    })
}

export async function getAllReimbursements(): Promise<Reimbursement[]>{
    const response = await backendClient.get("/reimbursements");
    return response.data.map((reimObj: any)=>{
        const{id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = reimObj;
        return new Reimbursement(id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type)
    })
}

export async function getReimbursementByUserId(id: number): Promise<Reimbursement[]>{
    const response = await backendClient.get(`/reimbursements/userId/${id}`);
    return response.data.map((reimObj: any)=>{
        const {id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = reimObj;
        return new Reimbursement(id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type)
    })
}

export async function submitReimbursement(r : Reimbursement) 
{
    try
    {
        const response = await backendClient.post("/reimbursements", {
            id: 0,
            author: r.author,
            amount: r.amount,
            dateSubmitted: r.dateSubmitted,
            dateResolved: r.dateResolved,
            description: r.description,
            resolver: r.resolver,
            status: r.status,
            type: r.type
        })
    }
    catch(e)
    {
        throw e;
    }
}

export async function updateReimbursement(id: number, author?: number, amount?: number, dateSubmitted?: number, dateResolved?: number, description?: string, resolver?: number, status?: number, type?: number)
{
    try
    {
        const response = await backendClient.patch("/reimbursements", {
            id: id,
            author: author,
            amount: amount,
            dateSubmitted: dateSubmitted,
            dateResolved: dateResolved,
            description: description,
            resolver: resolver,
            status: status,
            type: type

        })
    }
    catch(e)
    {
        throw e;
    }
}

export async function updateUser(id: number, username?: string, password?: string, email?:string)
{
    try
    {
        const response = await backendClient.patch("/users",{
            id: id,
            username: username, 
            password: password, 
            email: email
        })
    }
    catch(e)
    {
        throw e;
    }
}
 export async function getPendingReimbursements(): Promise<Reimbursement[]>
 {
     try
     {
         const response = await backendClient.get("/reimbursements/status/1")
         return response.data.map((reimObj: any)=>{
            const {id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = reimObj;
            return new Reimbursement(id, author, amount, dateSubmitted, dateResolved, description, resolver, status, type)
        })
     }
     catch(e)
     {
         throw e;
     }

 }