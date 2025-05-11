import { StoreDetails } from "../models/storeModel.model.js";
import upload from "../utils/upload.js";
// // Create or update store details
export const createStoreDetails = async (req, res, next) => {
    try {
      console.log("Hello")
     
      const store=await StoreDetails.create(req.body)
      console.log("Hello")
      res.status(201).json({ success: true, data: store });
    
  
    } catch (error) {
      
      console.log("error",error)
      next(error)
    }
  };
// import upload from "../middleware/upload.js";

// export const createStoreDetails = [
//   upload.fields([{ name: "vendorImage" }, { name: "bannerImage" }]),
//   async (req, res, next) => {
//     try {
//       const { fullName, email, location, phone, storeTime, vendorId } = req.body;

//       const vendorImage = req.files["vendorImage"]
//         ? `/uploads/vendors/${vendorId}/${req.files["vendorImage"][0].filename}`
//         : null;
//       const bannerImage = req.files["bannerImage"]
//         ? `/uploads/vendors/${vendorId}/${req.files["bannerImage"][0].filename}`
//         : null;

//       const store = await StoreDetails.create({
//         fullName,
//         email,
//         location,
//         phone,
//         storeTime: JSON.parse(storeTime),
//         vendorImage,
//         bannerImage,
//         vendorId
//       });

//       res.status(201).json({ success: true, data: store });
//     } catch (error) {
//       console.error("Upload error:", error);
//       next(error);
//     }
//   }
// ];
export const upsertStoreDetails = async (req, res, next) => {
  
     // Assuming vendorId comes from JWT auth middleware
    //  const list = StoreDetails.findById(req.params.id); // Get vendorId from the request (e.g., from JWT token or session)
    const vendorId= req.params.id; // Assuming vendorId comes from JWT auth middleware
    console.log("existing",vendorId)
    const list= await StoreDetails.findOne({vendorId}); // Get vendorId from the request (e.g., from JWT token or session)
    // const vendorId = req.params.id; // Assuming vendorId comes from JWT auth middleware
    // console.log("existing",vendorId)
    //  console.log("existing",list)

    // console.log("existing",vendorId)
    if(!list) {
      return res.status(400).json({ success: false, message: "ID Not Found." });
    }
    // console.log(req.user.id, list)
    // console.log(list, req.params.id, req.body)
    if(req.user.id !== list.vendorId ) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try{
      const updateStore= await StoreDetails.findOneAndUpdate({vendorId}, req.body, {new: true})
        res.status(200).json(updateStore);
      
    }
    catch(error){
      res.status(500).json({ success: false, error: error.message });
    }




  }

// Get store details by vendorId
// export const getStoreDetails = async (req, res) => {

//   try {
//     const { vendorId } = req.params.id;
//     const store = await StoreDetails.findOne({ vendorId });

//     if (!store) {
//       return res.status(404).json({ success: false, message: "Store not found" });
//     }

//     res.status(200).json({ success: true, data: store });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
export const getStoreDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const  vendorId  = req.params.id;
    console.log("vendorId",vendorId)
    const store = await StoreDetails.findOne({vendorId} );
    console.log("store",store)
    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
