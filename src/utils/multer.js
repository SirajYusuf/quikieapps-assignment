
const AWS = require('aws-sdk');


const uploadFile=async(req,res)=>{

    try{
        if(!req.file){
            throw new Error ('Please upload a file!')
        }

        const file = req.file;
        console.log(req.file)
        const fileType=req.fileType;

        //Configurations for the s3-bucket
      const s3 = new AWS.S3({
      accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    //Params for the s3-Bucket
    const params={
    Bucket: process.env.AWS_BUCKET,
    Key: req._id+'/'+Date.now()+'-'+req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
     };

     

    s3.upload(params, async function(s3Err, data) {
         
         if (s3Err) {

            return res.status(400).send({
                status:400,
                message:s3Err.message || "Unable to upload File.Try again"
            })
         }
         else{
         
            return res.status(200).send({

                status:200,
                message:"File uploaded successfully",
                File_URL:data.Location
            })
            
         }
     });
    
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({
            status:500,
            message:err.message || 'Due to technical issues something went wrong.Try again'
        })
    }

}
module.exports=uploadFile;
