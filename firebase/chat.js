import {db} from './config.js';
import { collection, addDoc, deleteDoc, getDocs, getDoc, doc } from "firebase/firestore";

let currentUser;
const Users = collection(db,'users');
//const friends = collection(db,`users/${currentUser.id}/friends`);

export const profile = (req,res) => {
    if(currentUser!=null){
        res.send({
            id:currentUser.id,
            uid:currentUser.get('uid'),
            name:currentUser.get('name')
        })
    }
    else
        res.send({msg:"Please login to view profile."})
}

export const createUser = async(req,res) => {
    const data=req.body;
    const Userlist = await getDocs(Users);
    var flag=false;
    Userlist.forEach(user => {
        if(user.get('uid')==data.uid){
            flag=true;
        }
    });
    if(flag)
        res.send({msg:'UID Already Exists!'});
    else{
        const user=await addDoc(Users,data);
        currentUser= await getDoc(doc(Users,user.id));
        res.send({msg:'User Added! Logged in Successfully.'});
    }
}

export const login = async(req,res)=>{
    const {uid,pass}=req.body;
    const Userlist = await getDocs(Users);
    let msg;
    Userlist.forEach(user => {
        if(user.get('uid')==uid){
            if(user.get('pass')==pass){
                currentUser=user;
                msg='logged in!';
            }
            else
                msg='Wrong Password';
        }
    });
    if(msg==null)
        msg='No such UID found.';
    res.send({message:msg});
}

export const logout = async(req,res)=>{
    currentUser=null;
    res.send({msg:'logged out!'});
}

export const readUsers = async(req,res) => {
    const Userlist = await getDocs(Users);
    Userlist.forEach(user => {
        console.log(user.get('uid'));
    });
    res.send({msg:"data printed"});
}

export const deleteUser = async(req,res) => {
    if(currentUser!=null){
        await deleteDoc(doc(Users, currentUser.id));
        currentUser=null;
        res.send({msg:'user deleted! Thanks for being with us.'})
    }
    else
        res.send({msg:"you're not logged in!" })
}

export function sendMessage(data){
    set(ref(db, 'test/'),data);
}