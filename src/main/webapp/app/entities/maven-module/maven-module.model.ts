import { BaseEntity } from './../../shared';

export const enum MavenPackaging {
    'POM',
    'JAR',
    'WAR'
}

export class MavenModule implements BaseEntity {
    constructor(
        public id?: number,
        public packaging?: MavenPackaging,
        public artifactId?: string,
        public application?: BaseEntity,
        public parent?: BaseEntity,
    ) {
    }
}
