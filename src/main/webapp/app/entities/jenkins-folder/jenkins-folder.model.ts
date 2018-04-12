import { BaseEntity } from './../../shared';

export class JenkinsFolder implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public mavenModule?: BaseEntity,
    ) {
    }
}
