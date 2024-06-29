const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name:  process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:  process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("profile image uploaded")
        return response.url;
    } catch (error) {
        console.log("profile image upload failed\n",error)
    }
}

const deleteFromCloudinary = async (imgName)=>{
    try {
        const response=await cloudinary.uploader.destroy(imgName)
        console.log("old profile image deleted")
    } catch (error) {
        console.log("old profile image deletion failed\n",error)
    }
}

module.exports={uploadOnCloudinary,deleteFromCloudinary};