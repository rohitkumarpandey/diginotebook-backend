const UserData = require('../model/userdata');
const Note = require('../model/note');
const { request, response } = require('express');

let service = {};

//get all note
service.getallnotes = async(request, response)=>{
    await UserData.findOne({userid : request.params['userid']})
    .populate('notes')
    .exec(function(err, user){
        if(err) throw new Error('Failed to fetch notes');
        else return response.status(200).json({success : true, notes : user.notes});
    });
}

//adding note
service.addnote = async(request, response)=>{
    await Note.create(request.body)
    .then((notecreated)=>{
        //if note saved to database
        if(notecreated){
            UserData.updateOne({ userid : request.params['userid'] }, {$addToSet : {notes : notecreated._id}})
            .then((updated)=>{
                if(updated){
                    return response.status(200).json({success : true, message : 'Note Added'});
                 }else{
                     return response.status(200).json({success : false, errorMessage : 'Failed to add note'});
                 }
            });
        }
    });
}


//update note
service.updatenote = async(request, response)=>{  

    await Note.updateOne({_id : request.params['noteid']}, {title : request.body['title'], note : request.body['note'], lastUpdated : Date.now()})
    .then((updated)=>{
        if(updated){
            return response.status(200).json({success : true , message : 'Note Updated'});
        }else{
            return response.status(200).json({success : false , errorMessage : 'Failed to update note'});
        }
    });
}

//delete note
service.deletenote = async(request, response)=>{
    await Note.findByIdAndDelete({_id : request.params['noteid']})
    .then((notedeleted)=>{
        if(notedeleted){
            UserData.updateOne({userid : request.params['userid']}, {$pull : {notes : request.params['noteid']}})
            .then((deleted)=>{
                if(deleted) return response.status(200).json({success : true, message : 'Note deleted'});
                else return response.status(200).json({success : false, message : 'Note deletetion failed'});
            });
            
        }else{
            return response.status(200).json({success : false, message : 'Note deleted'});
        }
    });
}

module.exports = service;