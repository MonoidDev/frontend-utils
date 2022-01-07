const { theme } = require('@monoid/monoid.theme.zipper-frontend');


module.exports = {
  safelist: [
    {
      pattern: /.+/
    }
  ],
  ...require('@monoid/monoid.tailwindcss.config').config,
  extends: {
    colors: {
      ...theme.colors
    }
  }
}
