import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationApplicationModule } from './application/application.module';
import { JhipsterSampleApplicationMavenModuleModule } from './maven-module/maven-module.module';
import { JhipsterSampleApplicationSonarComponentModule } from './sonar-component/sonar-component.module';
import { JhipsterSampleApplicationJenkinsFolderModule } from './jenkins-folder/jenkins-folder.module';
import { JhipsterSampleApplicationJenkinsJobModule } from './jenkins-job/jenkins-job.module';
import { JhipsterSampleApplicationJenkinsJobBuildModule } from './jenkins-job-build/jenkins-job-build.module';
import { JhipsterSampleApplicationGitRepoModule } from './git-repo/git-repo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationApplicationModule,
        JhipsterSampleApplicationMavenModuleModule,
        JhipsterSampleApplicationSonarComponentModule,
        JhipsterSampleApplicationJenkinsFolderModule,
        JhipsterSampleApplicationJenkinsJobModule,
        JhipsterSampleApplicationJenkinsJobBuildModule,
        JhipsterSampleApplicationGitRepoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
