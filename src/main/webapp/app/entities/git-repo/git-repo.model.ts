import { BaseEntity } from './../../shared';

export class GitRepo implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public mavenModule?: BaseEntity,
    ) {
    }
}
