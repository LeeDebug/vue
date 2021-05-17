/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// 编译器相关 源码入口
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将 template 模板解析为 AST 树
  const ast = parse(template.trim(), options)

  // 优化 遍历 AST 树，对每个节点进行优化
  if (options.optimize !== false) {
    optimize(ast, options)
  }

  // 代码生成，将 AST 树转换为可执行的 render 函数的字符串形式
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
