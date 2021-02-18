var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

```js
輸出結果:
undefined
5
6
20
1
10
100
````
## 建立 globalEC ，初始化 VO/scopeChain
```js
globalEC: {
  VO: {
      a: undefined,
      fn: func,
  },
  scopeChain: [globalEC.VO]
}
fn.[[scope]] = globalEC.socpeChain
```
執行第一行 var a = 1 發現 a 需要被賦值，到 globalEC.VO 找有沒有 a 這個變數，找到 a 後，把 a 的值設成 1 。

## 呼叫 fn ，建立 fnEC ,初始化 AO/scopeChain
```js
fnEC: {
    AO: {
        a: undefined,
        fn2: func,
    },
    scopeChain:[fnEC.AO,fnEC.[[scope]]]
}
fn2.[[scope]] = [fnEC.scopeChain]
```
執行 console.log(a) 到 fnEC.AO 找看看有沒有 a ，找到 a 了，a 的值是 undefined，印出 undefined
執行 var a = 5 發現 a 需要賦值，到 fnEC.AO 尋找有沒有 a 找到 a 了，把 a 的值設成 5
執行 console.log(a) 到 fnEC.AO 尋找有沒有 a 找到 a 的值是 5，印出 5
執行 a++ 發現 a 需要賦值，到 fnEC.AO 尋找有沒有 a 找到 a 了，把 a 的值設成 6

## 呼叫 fn2 ，建立 fn2EC ,初始化 AO/scopeChain
```js
fn2EC: {
    AO: {
     
    },
    scopeChain:[fn2EC.AO,fn2EC.[[scope]]]
}
```
執行 console.log(a) 到 fn2EC.AO 尋找有沒有 a 找不到 a，看 scopeChain 的上一層是 fnEC.AO 到 fnEC.AO 尋找有沒有 a 找到 a 的值是 6，印出 6

執行 a = 20 發現 a 需要賦值，到 fn2EC.AO 尋找有沒有 a 找不到 a，看 scopeChain 的上一層是 fnEC.AO 到 fnEC.AO 尋找有沒有 a 找到 a 了，把 a 的值設成 20

執行 b = 100 發現 b 需要賦值，到 fn2EC.AO 尋找有沒有 b 找不到 b，看 scopeChain 的上一層是 fnEC.AO 到 fnEC.AO 尋找有沒有 b 找不到 b，再看 scopeChain 的上一層是 globalEC.VO 到 globalEC.VO 尋找有沒有 b 找不到 b，但是已經是最上層了，所以把 b 放在 globalEC.VO，並設成 100

## fn2EC 執行結束，回到 fnEC 未完成的部分
執行 console.log(a) 到 fnEC.AO 尋找有沒有 a 找到 a 的值是 20，印出 20

## fnEC 執行結束，回到 globalEC 未完成的部分
執行 console.log(a) 到 globalEC.VO 尋找有沒有 a 找到 a 的值是 1，印出 1

執行 a = 10 發現 a 需要賦值，到 globalEC.VO 尋找有沒有 a 找到 a 了，把 a 的值設成 10

執行 console.log(a) 到 globalEC.VO 尋找有沒有 a 找到 a 的值是 10，印出 10

執行 console.log(b) 到 globalEC.VO 尋找有沒有 b 找到 b 的值是 100，印出 100

## globalEC 執行結束，call stack 已清空，程式執行完畢