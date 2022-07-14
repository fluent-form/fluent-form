import { Badge, Code, H3, LI, Spaced, TableWrapper, UL } from '@storybook/components';
import { styled } from '@storybook/theming';
import { miscellaneous } from 'documentation.json';
import Md from 'markdown-to-jsx';
import * as React from 'react';

export interface Fn {
  name: string;
  file: string;
  ctype: string;
  subtype: string;
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  args: Arg[];
  returnType: string;
  jsdoctags: Jsdoctag[];
}

export interface Arg {
  name: string;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  optional: boolean;
}

export interface Jsdoctag {
  name: Name;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  optional: boolean;
  tagName: Name;
  comment: string;
}

export interface Name {
  pos: number;
  end: number;
  flags: number;
  modifierFlagsCache: number;
  transformFlags: number;
  kind: number;
  escapedText: string;
}


const Name = styled.span({ fontWeight: 'bold' });

/** 分组后的 */
const builderMap = (miscellaneous.functions as Fn[])
  .filter(fn => fn.file.endsWith('builder.ts'))
  .reduce((acc, cur) => {
    acc[cur.name] ??= [];
    acc[cur.name].push(cur);
    return acc;
  }, {} as { [name: string]: Fn[] });

export const ControlBuilders = () => (
  Object.keys(builderMap).map(name => {
    const builder = builderMap[name];

    return (
      <React.Fragment key={name}>
        <H3>
          <Spaced col={1}>
            <span>{name}</span>
            <Badge status='positive'>stable</Badge>
          </Spaced>
        </H3>

        <TableWrapper>
          <thead>
            <tr>
              <th>Funtion</th>
              <th>Parameters</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              builder.map((fn, i) => {
                const fnArgs = fn.args.map(arg => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`).join(', ');
                const fnSign = `${name}(${fnArgs}): Builder`;

                return (
                  <tr key={i}>
                    <td>
                      <Name>
                        {fn.deprecated ? <del>{fnSign}</del> : fnSign}
                      </Name>
                    </td>
                    <td>
                      <UL style={{ margin: 0, paddingLeft: '16px' }}>
                        {
                          fn.args.map(arg => {
                            const description = fn.jsdoctags.find(tag => tag.name.escapedText === arg.name)?.comment;

                            return (
                              <LI key={arg.name}>
                                <Spaced col={1}>
                                  <Code>{arg.name}: {arg.type}</Code>
                                  {description && <Md style={{ display: 'inline' }}>{description}</Md>}
                                </Spaced>
                              </LI>
                            );
                          })
                        }
                      </UL>
                    </td>
                    <td><Md>{fn.description || '-'}</Md></td>
                  </tr>
                );
              })
            }
          </tbody>
        </TableWrapper>

        <br />
      </React.Fragment>
    );
  })
);