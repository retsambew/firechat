import { changeUser, currentUser, Users } from "../firebase.js";
import { deleteDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";

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

export const getUser = async(req,res) =>{
    if(currentUser!=null){
        const data=req.body;
        const Userlist = await getDocs(Users);
        var flag=true;
        Userlist.forEach(user => {
            if(user.get('uid')==data.uid){
                console.log('id:',user.get('uid'));
                console.log('name:',user.get('name'));
                flag=false;
            }
        });
        if(flag)
            res.send({msg:'No such user found!'});
        else{
            res.send({msg:'User Displayed on Console!'});
        }
    }
    else
        res.send({msg:"you're not logged in!" })    
}

export const deleteUser = async(req,res) => {
    if(currentUser!=null){
        await deleteDoc(currentUser.ref);
        changeUser(null);
        res.send({msg:'user deleted! Thanks for being with us.'})
    }
    else
        res.send({msg:"you're not logged in!" })
}
