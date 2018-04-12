import { BaseEntity } from './../../shared';

export const enum JenkinsJobType {
    'INT_BUILD',
    'INT_DEPLOY',
    'INT_SONAR',
    'REC_BUILD',
    'REC_RELEASE'
}

export class JenkinsJob implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public type?: JenkinsJobType,
        public jenkinsFolder?: BaseEntity,
    ) {
    }
}
