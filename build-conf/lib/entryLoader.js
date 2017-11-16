'use strict';

/**
 * glob 패턴은 와일드 카드 문자로 파일 이름 세트를 지정
 * - 셸에서 사용하는 패턴을 사용하여 파일을 일치
 * @see http://syaku.tistory.com/332
 * @see https://www.npmjs.com/package/glob
 */
const glob = require('glob');
const { existsSync } = require('fs');
const { join, parse } = require('path');

function entryLoader(entriesDir, pattern) {
  // 현재 존재하는 폴더인지 확인
  if (!existsSync(entriesDir)) {
    throw new Error(`'${entriesDir}' does not exist`);
  }

  /**
   * glob 검색을 수행
   * - pattern {String} Pattern to be matched
   * - options {Object}
   * - return: {Array<String>} filenames found matching the pattern
   */
  const globSync = glob.sync(pattern, { cwd: entriesDir });

  // globSync 내의 파일 경로를 entry화
  const entryLists = globSync.reduce((entries, file) => {
    // parse : file을 dir, name, ext, base
    /* example
    entry path : m/example/example-test.js
    {
      root: '',
      dir: 'm/example',
      base: 'example-test.js',
      ext: '.js',
      name: 'example-test'
    }
     */
    const { dir, name } = parse(file);
    entries[join(dir, name)] = join(entriesDir, file);
    return entries;
  }, {});

  return entryLists;
}

module.exports = entryLoader;