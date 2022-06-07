/**
    Copyright 2022 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import { InMemoryLineWriter } from './InMemoryLineWriter.js';
import { LineWriter } from './LineWriter.js';
import { PuppeteerStringifyExtension } from './PuppeteerStringifyExtension.js';
import type { Step, UserFlow } from './Schema.js';
import { StringifyExtension } from './StringifyExtension.js';

export interface StringifyOptions {
  extension?: StringifyExtension;
  writer?: LineWriter;
  indentation?: string;
}

/**
 * Stringifes an entire recording. The following hooks are invoked with the `flow` parameter containing the entire flow:
 * - `beforeAllSteps` (once)
 * - `beforeEachStep` (per step)
 * - `stringifyStep` (per step)
 * - `afterEachStep` (per step)
 * - `afterAllSteps` (once)
 */
export async function stringify(
  flow: UserFlow,
  opts?: StringifyOptions
): Promise<string> {
  if (!opts) {
    opts = {};
  }
  if (!opts.extension) {
    opts.extension = new PuppeteerStringifyExtension();
  }
  const ext = opts.extension;

  if (!opts.indentation) {
    opts.indentation = '  ';
  }
  if (!opts.writer) {
    opts.writer = new InMemoryLineWriter(opts.indentation);
  }
  const out = opts.writer;

  await ext.beforeAllSteps(out, flow);
  for (const step of flow.steps) {
    await ext.beforeEachStep(out, step, flow);
    await ext.stringifyStep(out, step, flow);
    await ext.afterEachStep(out, step, flow);
  }
  await ext.afterAllSteps(out, flow);

  return out.toString();
}

/**
 * Stringifes a single step. Only the following hooks are invoked with the `flow` parameter as undefined:
 * - `beforeEachStep`
 * - `stringifyStep`
 * - `afterEachStep`
 */
export async function stringifyStep(
  step: Step,
  opts?: StringifyOptions
): Promise<string> {
  if (!opts) {
    opts = {};
  }
  let ext = opts.extension;
  if (!ext) {
    ext = new PuppeteerStringifyExtension();
  }
  if (!opts.indentation) {
    opts.indentation = '  ';
  }
  const out = new InMemoryLineWriter(opts.indentation);

  await ext.beforeEachStep(out, step);
  await ext.stringifyStep(out, step);
  await ext.afterEachStep(out, step);

  return out.toString();
}
