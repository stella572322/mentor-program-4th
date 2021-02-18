console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

<!-- JS是一個單執行緒語言，它一次只能做一件事，這些任務會被放到 call stack 堆疊依序執行
line 1 => console.log(1)
所以第一行 console.log(1) 被放到 call stack 堆疊執行然後印出 1 之後 call stack pop off 。

line 2-4 => setTimeout(() => {console.log(2)}, 0)
把 setTimeout() 放到 call stack 後，因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以跟瀏覽器溝通後，它會被瀏覽器移到其他執行緒執行，瀏覽器會設一個 0 ms 的計時器，將 () => { console.log(2)} 放進 callback queue 依序排隊等待，等 call stack 裡堆疊的執行緒 pop off，才會移進 call stack 執行。

line 5 => console.log(3)
第五行 console.log(3) 被放到 call stack 堆疊然後執行印出 3 之後 call stack pop off 。

line 6-8 => setTimeout(() => {console.log(4)}, 0)
把 setTimeout() 放到 call stack 後，因為它是瀏覽器提供的 Web APIs 的一種，所以會被瀏覽器移到其他執行緒執行，瀏覽器會設一個 0 ms 的計時器，將 () => {
console.log(4)},放到 callback queue 依序排隊等待，等 call stack 裡堆疊的執行緒被 pop off 後，才會移進 call stack 執行。

line 9 => console.log(5)
把 console.log(5) 放進 call stack 堆疊執行，印出 5 之後 call stack pop off 。

在 call stack 全部執行緒 pop off 後，Even Loop 偵測 call stack 已經被清空沒有執行緒要執行了，這個時候 callback queue 會將排隊的執行緒依序堆疊到 call stack 上執行。

把排在 call queue 第一個 () => { console.log(2)
} 放進 call stack 執行 ，印出 2 之後 call stack pop off ，() => { console.log(2)
} 結束，call stack pop off 。

Even Loop 又偵測到 call stack 被清空了，

把 call queue 排在第二個的 () => { console.log(4)} 放進 call stack 執行 印出 4 ，() => { console.log(4)} 結束，然後 call stack pop off 。

call stack 跟 callback queue 都已經清空，程式結束。

結論:
最後整個程序執行緒執行完畢，依序印出 1、3、5、2、4 的結果。

1. call stack 堆疊的執行緒在執行完畢前，不會被 callback queue 排隊的執行緒打斷
2. 因為 setTimeout() 是瀏覽器提供的 Web APIs 的一種，所以會被瀏覽器移到其他的執行緒執行，它會在 callback 	queue 依序排隊等待 call stack pop off 後，才放進 call stack 堆疊執行。
3. js 還是跑單執行緒，但 Web APIs 提供了它運作東任務的可能，利用 Even Loop 機制來協調，幫助 js 執行非同步的任務。 -->
