import { changeUser, currentUser, Users } from "../firebase.js";
import { deleteDoc, doc, getDocs } from "firebase/firestore";

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

export const sendRequest = async(req,res)=>{
    res.send({msg:"Under Development."})
}

export const getUser = async(req,res) =>{
    res.send({msg:"Under Development."})
}

export const deleteUser = async(req,res) => {
    if(currentUser!=null){
        await deleteDoc(doc(Users, currentUser.id));
        changeUser(null);
        res.send({msg:'user deleted! Thanks for being with us.'})
    }
    else
        res.send({msg:"you're not logged in!" })
}
