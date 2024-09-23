# drupal-theming

Theme development for Drupal 11 with ddev.

To set up:

`git checkout https://github.com/PMcAllister-govuk/drupal-theming.git`  
`cd drupal-theming`  
`ddev start`  
`ddev composer install`  
`ddev restart`

When working on theming:

`ddev browsersync`  
`ddev watch`

'ddev watch' will install any necessary node dependencies for the theme before running in dev mode

Load site on http://localhost:3000

