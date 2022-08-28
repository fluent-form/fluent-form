import { Badge, Code, H3, LI, Link, Spaced, Span, TableWrapper, UL } from '@storybook/components';
import { styled } from '@storybook/theming';
import { interfaces } from 'documentation.json';
import Md from 'markdown-to-jsx';
import * as React from 'react';

/** @internal */
export interface Interface {
  name: string;
  id: string;
  file: string;
  deprecated: boolean;
  deprecationMessage: string;
  type: string;
  sourceCode: string;
  properties: Property[];
  indexSignatures: any[];
  kind: number;
  description: string;
  rawdescription: string;
  methods: Method[];
  extends: string;
}

/** @internal */
export interface Method {
  name: string;
  args: Arg[];
  optional: boolean;
  returnType: string;
  typeParameters: any[];
  line: number;
  deprecated: boolean;
  deprecationMessage: string;
  rawdescription: string;
  description: string;
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

/** @internal */
export interface Property {
  name: string;
  deprecated: boolean;
  deprecationMessage: string;
  type: string;
  optional: boolean;
  description: string;
  line: number;
}

const Required = styled.span(({ theme }) => ({
  color: theme.color.negative,
  fontFamily: theme.typography.fonts.mono,
  cursor: 'help',
}));

const Name = styled.span({ fontWeight: 'bold' });

function scrollIntoView(id: string) {
  document.getElementById(id)!.scrollIntoView({ behavior: 'smooth' });
}

export const Interfaces = () => (
  (interfaces as Interface[]).map(o => (
    <React.Fragment key={o.id}>
      <H3 id={o.name}>
        <Spaced col={1}>
          <span>{o.deprecated ? <del>{o.name}</del> : o.name}</span>
          {o.deprecated ? <Badge status='negative'>deprecated</Badge> : <Badge status='positive'>stable</Badge>}
        </Spaced>
      </H3>

      {/* 父接口 */}
      {
        o.extends && <>
          <Span>↳ extends </Span>
          <Link nochrome={true} onClick={() => scrollIntoView(o.extends)}>{o.extends}</Link>
        </>
      }

      {/* 接口描述 */}
      {o.description && <Md style={{ marginTop: '10px' }}>{o.description}</Md>}

      {/* 方法表格 */}
      {
        o.methods.length > 0 && <TableWrapper>
          <thead>
            <tr>
              <th>Method</th>
              <th>Parameters</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              o.methods.map(method => {
                const methodArgs = method.args.map(arg => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`).join(', ');
                const methodSign = `${method.name}${method.optional ? '?' : ''}(${methodArgs}): ${method.returnType}`;

                return (
                  <tr key={method.line}>
                    <td>
                      <Name>
                        {o.deprecated ? <del>{methodSign}</del> : methodSign}
                      </Name>
                      {o.deprecated && <Badge status='negative'>deprecated</Badge>}
                    </td>
                    <td>
                      <UL style={{ margin: 0, paddingLeft: '16px' }}>
                        {
                          method.args.map((arg, i) => {
                            const description = method.jsdoctags.find(tag => tag.name.escapedText === arg.name)?.comment;

                            return (
                              <LI key={i}>
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
                    <td><Md>{method.description || '-'}</Md></td>
                  </tr>
                );
              })
            }
          </tbody>
        </TableWrapper>
      }

      {/* 参数表格 */}
      {
        o.properties.length > 0 && <TableWrapper>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              o.properties.map(prop => (
                <tr key={prop.line}>
                  <td>
                    <Spaced col={1}>
                      <Name>
                        {prop.deprecated ? <del>{prop.name}</del> : prop.name}
                        {prop.optional || <Required title="Required">*</Required>}
                      </Name>

                      {prop.deprecated && <Badge status='negative'>deprecated</Badge>}
                    </Spaced>
                  </td>
                  <td><Code>{prop.type || '?'}</Code></td>
                  <td><Md>{prop.description || '-'}</Md></td>
                </tr>
              ))
            }
          </tbody>
        </TableWrapper>
      }

      <br />
    </React.Fragment>
  ))
);
