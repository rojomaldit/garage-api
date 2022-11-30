import {
 IsString
} from '@nestjs/class-validator';

export class VehicleDTO {

  @IsString()
  licensePlate: string;
}