Firestore構造
=========

Firestoreにはイベント情報, 参加者情報, 特権ユーザ情報を格納する.
フロントエンドは主にFirestoreの内容変更によって各種処理を行う.
変更内容は基本的にFirestore Security Rulesで検証される.
変更の権限についても詳細に定めてあるので別途参照のこと.

## /users/{userId}
特権ユーザを格納する. userIdはFirebase Authenticationのuidを指定する.
ここでの変更内容はFunctionsによりAuthenticationに反映される.
tokenに埋め込まれるものでもあるため, 変更時は場合によってはリロードなどして更新の必要あり.

Model: `functions/src/models/User.ts`

| key         | required | type                 | description                                                                         |
| ----------- | -------- | -------------------- | ----------------------------------------------------------------------------------- |
| role        | yes      | `'ADMIN' | 'EDITOR'` | 特権ユーザの種別. ADMIN=管理者,EDITOR=編集者                                        |
| email       | yes      | string               | ユーザに関連付いているメールアドレス. Authentication登録情報と同一でないといけない. |
| displayName | no       | string               | 表示名.自身のものだけ変更できる.                                                    |

## /events/{id}
イベント情報を格納する. idは自動生成にすること.
後述する`published == true`のものについてはFunctionsでRealtimeDBに複製される(API制限対策)ので,
一般ユーザが一覧取得するときはそちらを優先すること.

Model: `functions/src/models/Event.ts`

| key          | required | type      | description                                                                                    |
| ------------ | -------- | --------- | ---------------------------------------------------------------------------------------------- |
| title        | yes      | string    | イベント名                                                                                     |
| startAt      | yes      | Timestamp | イベント開始日時                                                                               |
| editors      | yes      | string[]  | イベントを編集できる編集者リスト. Authenticationのuid. **作成時には自身のIDを必ず入れる**こと. |
| published    | yes      | boolean   | 公開されているかどうか. 作成時に必ず`false`である**必要はない**                                |
| organization | no       | string    | 団体名                                                                                         |

## /events/{id}/secrets/{contentId}
イベントについて配信されるプッシュ通知とメール通知を格納する. contentIdは自動生成.
時間指定の送信のみである. ここの内容をもとにFunctionsがCloud Tasksなどを用いて処理を予約する.
編集者と管理者からのみ取得, 更新できる.

Model: `functions/src/models/EventSecret.ts`

| key     | required | type               | description                                               |
| ------- | -------- | ------------------ | --------------------------------------------------------- |
| type    | yes      | `'email' | 'push'` | 配信先の指定                                              |
| title   | yes      | string             | 配信タイトル(Subject)                                     |
| content | yes      | string             | 配信のコンテンツ(Pushの場合文字数制限される)              |
| link    | no       | string             | リンク(Push通知: 通知押下で開く, Email: メール末尾に付く) |
| sendAt  | yes      | Timestamp          | 送信予定日時. 過去を設定してもFunctionsで無視する.        |
| sent    | no       | boolean            | 送信済みかどうか. 内部用に近い.                           |

## /applications/{id}
イベント申し込み情報を保管する.

Model: `functions/src/models/Application.ts`

| key      | required | type    | description                                         |
| -------- | -------- | ------- | --------------------------------------------------- |
| userId   | yes      | string  | 申込者のuidと一致.                                  |
| eventId  | yes      | string  | イベントID. 公開されているイベントでないといけない. |
| email    | yes      | string  | 申込者emailと一致.                                  |
| accepted | yes      | boolean | 申込が承認されたか.自動承認はFunctions予定.         |
