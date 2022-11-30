import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleController } from "./controllers/vehicle.controller";
import { Vehicle } from "./models/vehicle.entity";
import { VehicleService } from "./services/vehicle.service";

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
