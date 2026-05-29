import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  avatar: { type: String },
  phone: { type: String },
  bio: { type: String },
  barber: { type: Schema.Types.ObjectId, ref: 'Barbeiro' },
}, { timestamps: true });

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;
