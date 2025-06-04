import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addRootProvider } from '@schematics/angular/utility';
import { NodeDependencyType, addPackageJsonDependency, getPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

const UI_PACKAGE_MAP = new Map<string, string>([['ng-zorro-antd', '@fluent-form/ui-zorro']]);

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      installUIPackage(host, context, options),
      addProvider(options)
    ]);
  };
}

function installUIPackage(host: Tree, context: SchematicContext, options: Schema) {
  return () => {
    if (options.ui === 'none') return;

    const fluentFormDep = getPackageJsonDependency(host, '@fluent-form/core')!;

    addPackageJsonDependency(host, {
      type: NodeDependencyType.Default,
      name: UI_PACKAGE_MAP.get(options.ui)!,
      version: fluentFormDep.version
    });

    context.addTask(new NodePackageInstallTask());
  };
}

function addProvider(options: Schema): Rule {
  return addRootProvider(options.project, ({ code, external }) => {
    return code`${external(
      'provideFluentForm',
      '@fluent-form/core'
    )}(/* TODO */)`;
  });
}
