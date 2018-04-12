import { BaseEntity } from './../../shared';

export class Application implements BaseEntity {
    constructor(
        public id?: number,
        public codeApplication?: string,
        public description?: string,
        public modules?: BaseEntity[],
    ) {
    }
}
