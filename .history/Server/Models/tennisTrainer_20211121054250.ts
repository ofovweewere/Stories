import mongoose, {PassportLocalSchema} from 'mongoose';
const Schema = mongoose.Schema; // Schema alias
import passportLocalMongoose from 'passport-local-mongoose'
const UserSchema = new Schema
({
    username: String,
    emailAddress: String,
    displayName: String,
    phoneNumber: Number,
    sex: String,
    birthDate: Date,
    province: String, 
    city: String,
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "tennisTrainer"
});

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("TrainerContact", UserSchema as PassportLocalSchema);

declare global
{
    export type TrainerDocument = mongoose.Document &
    {
        _id:String,
        username: String,
        emailaddress: String,
        displayName: String
    }
}
export default Model;