const test = require('ava');
const arrReplacer = require('../');
const $Promise = require('bluebird');

function getArr (n) {
  return Array(n).join('-').split('-').map((item, index) => index + 1);
}

function getMs () {
  return (new Date()).getTime();
}

test('join test', async (t) => {
  t.plan(3);

  const arr = getArr(100);
  const syncString = arr.join(',');
  const asyncString = await arrReplacer.replace(arr, 5);

  t.true(syncString === asyncString);

  const emptyString = await arrReplacer.replace([]);

  t.true(emptyString === '');

  const oneNum = await arrReplacer.replace([12]);

  t.true(oneNum === '12');
});

test('async test', async (t) => {
  t.plan(2);

  const arr = getArr(5000);
  const syncStartMs = getMs();
  const syncString = arr.join(',');
  const syncSpeed = getMs() - syncStartMs;
  
  console.log('Speed sync replace: %sms', syncSpeed, '5k/1 step');

  const asyncStartMs = getMs();
  const syncCheck = [];
  const asyncString = await new $Promise((resolve, reject) => {
    syncCheck.push('sync1');

    arrReplacer.replace(arr, 1)
    .then((res) => {
      syncCheck.push('async');
      resolve(res);
    }).catch(reject);

    syncCheck.push('sync2');
  });
  const asyncSpeed = getMs() - asyncStartMs;
  
  console.log('Speed async replace: %sms', asyncSpeed, '5k/5k steps');

  t.deepEqual(syncCheck, ['sync1', 'sync2', 'async']);
  t.true(syncString === asyncString);
});