import { addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { Users, currentUser, changeUser } from '../firebase.js';

export const login = async(req,res)=>{
    const {uid,pass}=req.body;
    const Userlist = await getDocs(Users);
    let msg;
    Userlist.forEach(user => {
        if(user.get('uid')==uid){
            if(user.get('pass')==pass){
                changeUser(user);
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
    changeUser(null);
    res.send({msg:'logged out!'});
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
        changeUser(await getDoc(doc(Users,user.id)));
        res.send({msg:'User Added! Logged in Successfully.'});
    }
}

export const readUsers = async(req,res) => {
    const Userlist = await getDocs(Users);
    Userlist.forEach(user => {
        console.log("id:",user.get('uid'));
    });
    res.send({msg:"data printed on console!"});
}
