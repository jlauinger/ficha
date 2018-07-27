# Ficha

Ficha is a vocabulary / facts / ... trainer. Users can create and edit collections of index cards.
When learning a collection, the user is presented with one card at a time. They can answer and
check their solution, or skip the card. There is a feature to automatically check the answer upon
pressing the `Return` key.

Collections are fetched from a server. These are called community collections and can not be edited.
When a user adds new collections, they are stored in `LocalStorage`. There are no limits whatsoever
on local content.

Collections can be imported from and exported to CSV files.

The project's name is based on the Spanish translation for index cards.


## Deployment

 - Run `ng build --aot --prod --base-href="/"` to compile the app.
 - Point a web server to the `dist/ficha` directory
 - Make a JSON file available at `api/collections.json` to have pre-filled data


## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in 
the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## License

Copyright 2018 Johannes Lauinger

Ficha is free software. It is licensed under the terms of the GNU General Public License,
version 3 (GPLv3). The GPLv3 is included in the file LICENSE.
