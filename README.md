# doc-ear

You can save articles with a highlighted phrase.

## Set Notion Page

- login to [notion.so](notion.so) by admin user
- create databases where you save articles
  - follow [this instruction](https://www.notion.so/guides/creating-a-database)
  - do not create a new database by `/database` command in notion
- add properties listed below to each database. Note that you should create **extactly the same properties** with listed names.

| property  | type   |
| --------- | ------ |
| Title     | Title  |
| URL       | URL    |
| Status    | Select |
| Highlight | Text   |

## Set Notion Integrations

- follow the instruction of Notion API
  - navigate to [My Integrations](https://www.notion.so/my-integrations)
    - add New Integrations
    - select your workspace where you save articles
- invite the integration to target databases page via `Share` -> `Invite`

## Set Chrome Extensions

- navigate to [release page](https://github.com/hokekiyoo/doc-ear/releases/tag/0.0.1)
  - download `doc-ear.chrome.zip` in this page
- navigate to chrome://extensions
  - drag and drop the extension from your file manager anywhere onto the extensions page

## Integrate Chrome Extentions with Notion

- right-click on the extension icon and select `Options`
- copy integration-id (**not the secret token**)
  - navigate to `my integrations` you created in `Setting Notion Page` section
  - `https://www.notion.so/my-integrations/internal/${integration-id}`
- paste the integration id and click check button.
