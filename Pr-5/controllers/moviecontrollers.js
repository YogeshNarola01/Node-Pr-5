const moviemodel = require('../models/moviemodel')
const path = require('path')
const fs =  require('fs')
const ShowInput = async(req,res) => {
    res.render('addmovie')
}
const ViewMovie = async(req,res) => {
   try {
    const movie =await moviemodel.find()
    res.render('viewmovie',{movie})
   } catch (error) {
    
   }
}


const addmovie =  async(req,res) => {
    try {
        const {name,description,price} = req.body;
        const image = req.file.filename
        const movie = await new moviemodel({
            name ,description,price,image
        })
        await movie.save()
        res.redirect('/viewmovie')
    } catch (error) {
        console.log(error);
        return false
    }
}
const deletemovie = async(req,res) => {
   try {
    const id = req.query.id
    await moviemodel.findByIdAndDelete(id)
    res.redirect('/viewmovie')
   } catch (error) {
    console.log(error);
    return false
   }
}
const editmovie = async(req,res) => {
    try {
       const id  = req.query.id
       const movie = await moviemodel.findById(id)
       res.render('editmovie',{movie})
    } catch (error) {
     console.log(error);
     return false
    }
 }
 const updatemovie = async(req,res) => {
    try {
        const {name,description,price,id} = req.body
        const movie = await moviemodel.findById(id)
         if(req.file){
            const newimage = req.file.filename
            const oldImagePath = path.join(__dirname,'../public/uploads/',movie.image)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            movie.image = newimage
         }else{
            movie.image = movie.image
         }
         movie.name = name
         movie.description = description
         movie.price = price

         await movie.save()
         res.redirect('/viewmovie')
    } catch (error) {
        console.log(error);
        
    }
 }
module.exports = {
    ShowInput,ViewMovie,addmovie,deletemovie,editmovie,updatemovie
}