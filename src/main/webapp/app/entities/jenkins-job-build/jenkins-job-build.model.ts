import { BaseEntity } from './../../shared';

export const enum JenkinsJobBuildState {
    'SUCCESS',
    'FAIL',
    'WARN'
}

export class JenkinsJobBuild implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public state?: JenkinsJobBuildState,
        public jenkinsJob?: BaseEntity,
    ) {
    }
}
