import { Badge, Code, H3, LI, Link, Spaced, Span, TableWrapper, UL } from '@storybook/components';
import { styled } from '@storybook/theming';
import { interfaces } from 'documentation.json';
import Md from 'markdown-to-jsx';
import * as React from 'react';

interface Method {
  name: string;
  optional: boolean;
  description: string;
  returnType: string;
  line: number;
  args: {
    name: string;
    type: string;
    optional: boolean;
  }[];
  jsdoctags: {
    type: string;
    name: {
      escapedText: string;
    };
    comment: string;
  }[];
}

interface Property {
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

const Title = styled.div({ fontWeight: 'bold' });
const Name = styled.span({ fontWeight: 'bold' });

function scrollIntoView(id: string) {
  document.getElementById(id)!.scrollIntoView({ behavior: 'smooth' });
}

export const Interfaces = () => (
  interfaces.map(o => (
    <React.Fragment key={o.id}>
      <H3 id={o.name}>
        <Spaced col={1}>
          <Span>
            {o.deprecated ? <del>{o.name}</del> : o.name}
          </Span>

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
              o.methods.map((method: Method) => {
                const methodArgs = method.args.map(arg => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`).join(', ');
                const methodSign = `${method.name}${method.optional ? '?' : ''}(${methodArgs}): ${method.returnType}`

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
                          method.jsdoctags.map((tag, i) => (
                            <LI key={i}>
                              <Spaced col={1}>
                                <Code>{tag.name.escapedText}: {tag.type}</Code>
                                <Md style={{ display: 'inline' }}>{tag.comment}</Md>
                              </Spaced>
                            </LI>
                          ))
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
              o.properties.map((prop: Property) => (
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
