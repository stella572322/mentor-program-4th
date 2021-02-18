const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??

<!-- obj.inner.hello()
hello() 這個 function 是由 obj.inner 來呼叫的 既然是 obj.inner 呼叫的，就代表 this 是 obj.inner 所以 this.value 的值就會是 obj.inner.value === 2 console.log(this.value) 印出的結果就是 2

obj2.hello()
hello() 這個 function 是由 obj2 來呼叫的 既然是 obj2 呼叫的，就代表 this 是 obj2 所以 this.value 的值就會是 obj2.value === obj.inner.value === 2 console.log(this.value) 印出的結果就是 2

hello()
hello() 這個 function 是由誰呼叫的？沒有東西呼叫 那 hello 本身只是一個單純的 function 代表 this 的值會是預設值 global 為預設值得情況下，在 global 底下去找 value 這個值 因為找不到，所以 this.value === undefined console.log(this.value) 印出的結果就是 undefined -->