# zdiff

## import! only support es6+ environment

## 重要提示！仅仅支持es6及以上的运行环境

zdiff是一个基于lodash的简单的javascript库，旨在为javascript对象创建快照，并可以将修改后的对象和快照进行比较，产生一个patch，这个patch中仅仅包括修改后的数据，方便使用http请求的PATCH方法的时候传输数据。zdiff的快照是对对象的deepClone，计算生成patch的过程会对对象进行递归比较（所以效率很渣），并且patch只针对deepth为1的字段，这里的deepth为1是指如果deepth超过1的字段发生变更，会认为包括它的deepth为1的字段发生了变更，因而patch会包括整个deepth为1的字段及其后代（可以认为zdiff将deepth为1的字段与其后代视为一个整体）。

1. 生成快照

   ```javascript
   const { Snapshot: Snapshot } = require('zdiff');
   const source = {
       a: 1,
       b: {
           a: 1
       },
       c: [1, 2, 3],
       d: '123',
       e: [
           {
               a: 1
           },
           {
               b: 2
           }
       ]
   };
   
   const snapshot = new Snapshot(source);
   const snapshot1 = snapshot.takeSnapshot();
   
   expect(snapshot1).toEqual(source); // true
   snapshot1 === source // false
   
   ```

2. 获取快照

   ```javascript
   const { Snapshot: Snapshot } = require('zdiff');
   const source = {
       a: 1,
       b: {
           a: 1
       },
       c: [1, 2, 3],
       d: '123',
       e: [
           {
               a: 1
           },
           {
               b: 2
           }
       ]
   };
   
   snapshot.takeSnapshot();
   const snapshot1 = snapshot.getSnapshot();
   
   expect(snapshot1).toEqual(source); // true
   snapshot1 === source // false
   ```

3. 生成patch

   ```javascript
   const { Snapshot: Snapshot } = require('zdiff');
   const source = {
       a: 1,
       b: {
           a: 1
       },
       c: [1, 2, 3],
       d: '123',
       e: [
           {
               a: 1
           },
           {
               b: 2
           }
       ]
   };
   
   const snapshot = new Snapshot(source);
   snapshot.takeSnapshot();
   source.a = '111';
   source.b = {
       a: 1,
       b: 2
   };
   source.c = [1, 2, 3, 'a'];
   source.d = 123;
   source.e = [
       {
           a: 1
       },
       {
           b: '2'
       }
   ];
   const patch = snapshot.getDiffPatch();
   
   expect(patch).toEqual({
       a: '111',
       b: {
           a: 1,
           b: 2
       },
       c: [1, 2, 3, 'a'],
       d: 123,
       e: [
           {
               a: 1
           },
           {
               b: '2'
           }
       ]
   }); // true
   ```
