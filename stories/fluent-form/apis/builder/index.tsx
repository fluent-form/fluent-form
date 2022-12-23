import { Badge, Code, H3, LI, Spaced, TableWrapper, UL } from '@storybook/components';
import { styled } from '@storybook/theming';
import { miscellaneous } from 'documentation.json';
import Md from 'markdown-to-jsx';
import * as React from 'react';

/** @internal */
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

/** @internal */
export interface Arg {
  name: string;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  optional: boolean;
}

/** @internal */
export interface Jsdoctag {
  name: Name;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  optional: boolean;
  tagName: Name;
  comment: string;
}

/** @internal */
export interface Name {
  pos: number;
  end: number;
  flags: number;
  modifierFlagsCache: number;
  transformFlags: number;
  kind: number;
  escapedText: string;
}

const Title = styled.div({ fontWeight: 'bold' });
const Name = styled.col({ fontWeight: 'bold' });

/** 分组后的 */
const fnMap = (miscellaneous.functions as Fn[])
  .filter(fn => fn.file.endsWith('builder.ts'))
  .reduce((acc, cur) => {
    acc[cur.name] ??= [];
    acc[cur.name].push(cur);
    return acc;
  }, {} as { [name: string]: Fn[] });

export const Builders = () => (
  Object.keys(fnMap).map(name => {
    // 函数的重载数组
    let fns = fnMap[name];
    // 如果有重载，则需要把最后一个剔除，因为最后一个是函数的最终签名，对用户是不可见的
    if (fns.length > 1) {
      fns = fns.slice(0, fns.length - 1);
    }

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
              <th>Function</th>
              <th>Parameters</th>
            </tr>
          </thead>
          <tbody>
            {
              fns.map((fn, i) => {
                const fnArgs = fn.args.map(arg => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`).join(', ');
                const fnSign = `${name}(${fnArgs}): ${fn.returnType ?? 'Builder<?>'}`;

                return (
                  <tr key={i}>
                    <td>
                      <Title>
                        {fn.deprecated ? <del>{fnSign}</del> : fnSign}
                      </Title>
                      {fn.description && <Md>{fn.description}</Md>}
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