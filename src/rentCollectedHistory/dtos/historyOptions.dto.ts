import { IsEnum } from '@nestjs/class-validator';
import { RentType } from 'src/rent/models/rent.entity';

export class HistoryOptionsDTO {
	@IsEnum(RentType)
	type: RentType;
}
