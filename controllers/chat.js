import {currentUser} from '../firebase.js';


export const showFriends = async (req,res)=>{
    if(currentUser!=null){
        const friends=currentUser.get('friends');
        if(friends!=null){
            friends.forEach(friend => {
                console.log(friend.get('friendID'));
            });
        }
        else
            res.send({msg:'User has no friend!'})
    }
    else{
        res.send({msg:'Not Logged in!'})
    }
}

export const showMessages = async(req,res)=>{

}

export const sendMessage = async(req,res)=>{

}