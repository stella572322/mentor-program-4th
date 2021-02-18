for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

<!-- 程式開始執行
執行第一圈迴圈 i=0
將 console.log('i: ', + i) 放進 call stack 執行
console.log('i: ', + i) 印出 i=0 之後 call stack pop off，
將 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以瀏覽器會把它移到其他執行緒執行，設一個 0*1000 = 0ms 的計時器，將 () => {console.log(i)} 放進 callback queue 排隊等待，因為此時 call stack 還有其他任務正在執行

執行第二圈迴圈 i=1
將 console.log('i: ', + i) 放進 call stack 執行
console.log('i: ', + i) 印出 i=1 之後 call stack pop off，
將 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以瀏覽器會把它移到其他執行緒執行，設一個 1*1000 = 1000ms 的計時器，將 () => {console.log(i)} 放進 callback queue 排隊等待，因為此時 call stack 還有其他任務正在執行

執行第三圈迴圈 i=2
將 console.log('i: ', + i) 放進 call stack 執行
console.log('i: ', + i) 印出 i=1 之後 call stack pop off，
將 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以瀏覽器會把它移到其他執行緒執行，設一個 2*1000 = 2000ms 的計時器，將 () => {console.log(i)} 放進 callback queue 排隊等待，因為此時 call stack 還有其他任務正在執行

執行第四圈迴圈 i=3
將 console.log('i: ', + i) 放進 call stack 執行
console.log('i: ', + i) 印出 i=1 之後 call stack pop off，
將 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以瀏覽器會把它移到其他執行緒執行，設一個 3*1000 = 3000ms 的計時器，將 () => {console.log(i)} 放進 callback queue 排隊等待，因為此時 call stack 還有其他任務正在執行

執行第五圈迴圈 i=4
將 console.log('i: ', + i) 放進 call stack 執行
console.log('i: ', + i) 印出 i=1 之後 call stack pop off，
將 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以瀏覽器會把它移到其他執行緒執行，設一個 4*1000 = 4000ms 的計時器，將 () => {console.log(i)} 放進 callback queue 排隊等待，因為此時 call stack 還有其他任務正在執行

執行第六圈迴圈 i=5 ，因為不符合 i<5 ，所以跳出迴圈，call stack pop off。

Even Loop 偵測到 call stack 清空了
所以把 call queue 排在第一個的 () => { console.log(i) } 放進 call stack ，將 console.log(i) 堆疊執行 ，印出 5 後，call stack pop off () => { console.log(i) }  結束，call stack pop off

==== 每隔0、1、2、3、4秒，第次迴圈的 setTimeout() 時間到，重複以下步驟
() => { console.log(i) } 移到 Callback Queue 等待，但因為 call stack 已清空，所以 () => { console.log(i) } 直接放到 call stack 將 console.log(i) 放到 call stack 上方 執行 console.log(i) 印出 5 之後 call stack pop off () => { console.log(i) } 結束，call stack pop off 。直到 callback queue 和call stack 被清空，程式結束。

結論:
會印出
0
1
2
3
4
5
// 1s
5 
// 1s
5 
// 1s
5 
// 1s
5 
 -->


