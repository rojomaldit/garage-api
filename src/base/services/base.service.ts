import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Base } from '../models/base.entity';

export class BaseService<T extends Base> {
	constructor(private readonly genericRepository: Repository<T>) {}

	create(entity: any): Promise<T> {
		try {
			return new Promise<T>((resolve, reject) => {
				this.genericRepository
					.save(entity)
					.then((created) => resolve(created))
					.catch((err) => reject(err));
			});
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	update(id: number, entity: any): Promise<number> {
		try {
			return new Promise<number>((resolve, reject) => {
				this.genericRepository
					.update(id, entity)
					.then((updated) => resolve(updated.affected))
					.catch((err) => reject(err));
			});
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	getAll(): Promise<T[]> {
		try {
			return <Promise<T[]>>this.genericRepository.find();
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	get(id: number): Promise<T> {
		try {
		} catch (error) {
			throw new BadGatewayException(error);
		}
		return <Promise<T>>this.genericRepository.findOne({ where: { id } });
	}

	async getOrFail(id: number, options?): Promise<T> {
		try {
			const obj = await this.genericRepository.findOne(id, options);
			if (!obj) throw new BadRequestException('Object not found');

			return obj;
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async delete(id: number, options?, validate?: (obj: T) => boolean) {
		try {
			const obj = await this.getOrFail(id, options);

			if (validate && !validate(obj)) throw new BadRequestException('This object cannot be deleted');

			await this.update(id, { deletedAt: new Date() });
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}

	getByOptions(options: any): Promise<T> {
		try {
			return <Promise<T>>this.genericRepository.findOne(options);
		} catch (error) {
			throw new BadGatewayException(error);
		}
	}
}
