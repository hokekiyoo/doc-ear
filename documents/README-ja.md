# doc-ear Getting Started

## 1. chrome 拡張を登録する

[doc-ear](https://chrome.google.com/webstore/detail/doc-ear/ehnemnmbeciffbkhjhliocjhlgfhbdcm?hl=ja&authuser=0)にアクセスし、`chromeに追加`を選択

## 2. notion ページのセットアップ

[notion](https://www.notion.so)にログイン

[テンプレートページ](https://www.notion.so/6b016c99ac6141f0ac8842891c0f6ced?v=d831c62a89e14794b250612650256890)自分の notion のページに複製する

![template](./images/1-duplicate-template.png)

- テンプレートを利用しない場合、notion 上に手作業で Databese のページを作る [作り方:notion](https://www.notion.so/guides/creating-a-database)
- 自分で作成する場合は、下記の property と type を正確に入力する

| property  | type   |
| --------- | ------ |
| Title     | Title  |
| URL       | URL    |
| Status    | Select |
| Highlight | Text   |

## 3. Notion Integrations の設定と登録

[My Integrations](https://www.notion.so/my-integrations)にアクセスし `add New Integrations`を押下

![integration](./images/2-setting-integration.png)

integration 名を入力(任意で良いが、拡張の名前が`doc-ear`なのでわかりやすさのために同じにしておくことを推奨します)し、ワークスペースを選択する

![integration](./images/3-setting-integration-2.png)

作った integration ページのアドレス`https://www.notion.so/my-integrations/internal/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`の`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`部分をコピーする

![ID](./images/4-copy-ID.png)

chrome 拡張を右クリックし、`オプション`を選択します

![option](./images/5-option.png)

ポップアップが現れるので、そこに先程コピーした 32 桁の ID: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`をペーストし、✓ を押す

![input](./images/6-input-ID.png)

## 4. notion ページに doc-ear を integrate

`2`で作ったページに飛び、右上の`Share`を押下 →`Invite`を押下

![invite](./images/7-share-invite.png)

`3`で作った integration を選択肢から選び、`Invite`を押下

![select](./images/8-select-integration.png)

## 5. 実行

web ページで気になるところを範囲選択し、doc-ear のアイコンを押下 →`Bookmark`を押下

![copy](./images/9-copy.png)

notion ページに飛ぶと、選択した highlight と一緒に記事が登録されている

![page](./images/10-page.png)
