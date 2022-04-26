# AngularUnitTestDemo

這 Demo 是筆者常遇到的測試情境與測試方式，基本上都是從官網上學習而來，所以強烈建議還是看完 [官網 Testing 章節](https://angular.io/guide/testing)，不然很有可能看不太明白這些測試方式。


## 範例1：app-button

涵蓋了7成的基本測試方式，如果能理解此範例，基本上可以自己動手寫測試了。

checklist

- [x] 認識 jasmine 的斷言方式，ex : expect(a).toEqual(b) => 預期 a 等於 b。
- [x] 認識 jasmine 常用的 Matchers (toBe、toEqual、toBeTruthy、toBeFalse、toContain...)
- [x] 理解使用 fixture.detectChanges 讓觸發檢核畫面改變。
- [x] 理解 color 測試的兩種方式，使用畫面來驗證測試 與 單純函式測試。
- [x] 理解使用 fakeAsync 來啟動假異步控制，並使用 tick 對時間進行快轉。
- [x] 理解使用 Jasmine 的 Spy 的測試方式，進行 buttonClick.emit 的測試。

## 範例2：app-text-input

為了一些無法單獨建立出來的元件的測試示範，換句話說就是需要放在一個測試宿主元件上才能進行測試(關鍵字：HostComponent)，如同此範例使用了 ControlValueAccessor，在測試的時候就需要放在某個 component 才比較方便進行測試。

checklist

- [x] 理解使用 TestHostComponent 幫助 AppTextInput 進行測試。
- [x] 理解使用 By.directive 也可以取得某個 angular tag。
- [x] 理解使用 afterEach 對於一些全域變數進行 reset 的重要行。(此範例是刻意抽成 myFormControl，也可以不抽出來)
- [x] 理解如何觸發 focus 與 blur event。
- [x] 理解 Jasmine 的 Spy 也可以取得被呼叫傳入的值(args)。

## 範例3：user-info

示範如何對 API 進行 Mock，並測試 API 成功 與 失敗 的情境。(請注意此範例是刻意把打 API 行為寫在 ui component 裡面)。

checklist

- [x] 理解如何抽出 Service 然後進行 mock。
- [x] 理解 Jasmine 的 Spy 可以根據不同參數，進行不一樣的回傳值。
- [x] 理解如何 mock api 成功 與 失敗 的 response。

## 範例4：user-info-area

示範如何測試元件內部的子元件，基本上我們應該只專注測試與此子元件的 @input 與 ＠output 的綁定，不應該去對此元件的畫面或邏輯進行測試，換句話說，這顆子元件的測試應該寫在子元件底下，而不是由父元件去對子元件進行測試。

checklist

- [x] 理解範例四與範例二的差別。
- [x] 理解如何測試對於子元件 @input 的兩種方式。
- [x] 理解如何測試對於子元件 @output 的方式。

## wiki：相關概念整理(只有Q，沒有A!)
- [x]  [Angular Unit Test 重點 Q&A](https://github.com/JiaHongL/angular-unit-test-demo/wiki/Angular-Unit-Test-%E9%87%8D%E9%BB%9E-Q&A)
