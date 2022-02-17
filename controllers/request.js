import { currentUser, msgDB, Users } from "../firebase.js";
import { doc, addDoc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";

export const getRequests = async(req,res)=>{
    if(currentUser!=null){
        const requests=currentUser.get('requests');
        if(requests!=null){
            requests.forEach(async id=>{
                const user= await getDoc(doc(Users,id));
                console.log(user.get('uid'));
            });
            res.send({msg:"All Requests Displayed on console!"});    
        }
        else{
            res.send({msg:"No Requests to display."})
        }
    }
    else
        res.send({msg:"Not Logged in!."})
}

export const getPendingRequests = async(req,res)=>{
    if(currentUser!=null){
        const requests=currentUser.get('sent_requests');
        if(requests!=null){
            requests.forEach(async id=>{
                const user= await getDoc(doc(Users,id));
                console.log(user.get('uid'));
            });
            res.send({msg:"All Requests Displayed on console!"});    
        }
        else{
            res.send({msg:"No Requests to display."})
        }
    }
    else
        res.send({msg:"Not Logged in!."})
}

export const sendRequest = async(req,res)=>{
    const data=req.body.uid;
    if(currentUser==null)
        res.send({msg:"you're not logged in!" })
    else if(currentUser.get('uid')==data)
        res.send({msg: "cant send request to yourself!"})
    else{
        const Userlist = await getDocs(Users);
        var flag=true;
        Userlist.forEach(user => {
            if(user.get('uid')==data){
                try{
                    console.log(currentUser.id,user.id)
                    updateDoc(user.ref,{requests:arrayUnion(currentUser.id)})
                    updateDoc(currentUser.ref,{sent_requests:arrayUnion(user.id)})
                }
                catch(err){
                    console.log(err);
                }
                flag=false;
            }
        });
        if(flag)
            res.send({msg:'No such user found!'});
        else{
            res.send({msg: 'Request Sent!'})
        }        
    }
}

export const acceptRequest = async (req,res)=>{
    const friendID = req.body.id;
    const friend = await getDoc(doc(Users,friendID));
    const data={
        chat:[{
        sender:"server",
        msg:`${currentUser.get('uid')} accepted your request.`,
        time: serverTimestamp()
        }]
    }
    console.log(data);
    const message = await addDoc(msgDB,{});
    updateDoc(currentUser.ref,{friends:arrayUnion({"friendID":friendID,"chatID":message.id}),requests:arrayRemove(friendID)})
    updateDoc(friend.ref,{friends:arrayUnion({"friendID":currentUser.id,"chatID":message.id}),sent_requests:arrayRemove(currentUser.id)})
    res.send({msg:"Requst accepted!"})
}

export const rejectRequest = async (req,res)=>{
    const friendID = req.body.id;
    const friend = await getDoc(doc(Users,friendID));
    updateDoc(currentUser.ref,{requests:arrayRemove(friendID)})
    updateDoc(friend.ref,{sent_requests:arrayRemove(currentUser.id)})
    res.send({msg:"Requst rejected!"})
}