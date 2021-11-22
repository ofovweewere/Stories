import mongoose, {PassportLocalSchema} from 'mongoose';
const Schema = mongoose.Schema; // Schema alias
import passportLocalMongoose from 'passport-local-mongoose'
const UserSchema = new Schema
({
    userType: String,
    username: String,
    emailAddress: String,
    displayName: String,
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
    collection: "tennisTrainerSeeker"
});

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("Auditor", UserSchema as PassportLocalSchema);

declare global
{
    export type AuditorDocument = mongoose.Document &
    {
        _id:String,
        username: String,
        emailaddress: String,
        displayName: String
    }
}
export default Model;