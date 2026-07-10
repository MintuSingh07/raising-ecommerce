import mongoose, { Schema } from "mongoose";

export interface ISetting {
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>({
  key: { type: String, required: true, unique: true, trim: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-update the updatedAt field on save
SettingSchema.pre("save", function(next: any) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);
