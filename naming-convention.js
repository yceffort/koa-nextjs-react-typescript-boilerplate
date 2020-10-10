// Edit your custom Exclude words
const excludeWords = [
  'redirect_uris',
  'client_id',
  'client_secret',
  'access_type',
]
const regex = `${excludeWords.join('|')})$`

const defaultRule = require('eslint-config-yceffort/rules/typescript')

const extendedRules = defaultRule.rules[
  '@typescript-eslint/naming-convention'
].map((item) =>
  typeof item === 'string'
    ? item
    : {
        ...item,
        filter: {
          regex: `${item.filter.regex.split(')$')[0]}|${regex}`,
          match: false,
        },
      },
)

module.exports = {
  extendedRules,
}
