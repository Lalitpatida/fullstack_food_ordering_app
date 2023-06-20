const router =require('express').Router();
const admin=require('firebase-admin')
let data=[];

router.get("/",(req,res)=>{
    return res.send("Inside the user router");
});

router.get("/jwtVerification",async (req,res)=>{
if(!req.headers.authorization){
    return res.status(500).send({msg : "Token not found"});
}
const token=req.headers.authorization.split(" ")[1];

try{
const decodedValue=await admin.auth().verifyIdToken(token);
if(!decodedValue){
    return res.status(500).json({success : false,msg:"Unauthorized access"});
}


return res.status(200).json({success:true, data:decodedValue});

}catch(err){
return res.send({success :false,msg:`Error in Extracting the Token : ${err}`,
});
}
});


const listAllUsers = async (nextPageToken) => {
   admin
    .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((rec) => {
          data.push(rec.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((err) => console.log(err));
      };

  listAllUsers();
  router.get("/all",async(req,res)=>{
    listAllUsers();
    try{
        return res.status(200).send({success:true, data:data, dataCount});
    }catch(err){
       return res.send({success:false , msg:`Error in listing users :,${err}`});
    }
  });


module.exports=router;