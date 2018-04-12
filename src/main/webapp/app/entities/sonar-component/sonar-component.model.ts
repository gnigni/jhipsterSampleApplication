import { BaseEntity } from './../../shared';

export const enum SonarQualifier {
    'BRC',
    'DIR',
    'FIL',
    'TRK',
    'UTS'
}

export class SonarComponent implements BaseEntity {
    constructor(
        public id?: number,
        public organization?: string,
        public componentId?: string,
        public componentKey?: string,
        public name?: string,
        public description?: string,
        public qualifier?: SonarQualifier,
        public path?: string,
        public mavenModule?: BaseEntity,
    ) {
    }
}
