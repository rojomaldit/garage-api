import { IsBoolean } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";

export class VehicleGetOptions {
  // If true return all vehicles that can be used to create a rent
  // If false return all vehicles that can not be used to create a rent
  // If null return all vehicles
  @IsOptional()
  @IsBoolean()
  availableToRent?: boolean;
}
