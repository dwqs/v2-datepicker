![npm-version](https://img.shields.io/npm/v/v2-datepicker.svg) ![license](https://img.shields.io/npm/l/v2-datepicker.svg)
# v2-datepicker
A simple datepicker component based Vue 2.x.

## Installation

Install the pkg with npm:

```
npm i --save v2-datepicker

or yarn

```
yarn add  v2-datepicker
```

## Usage

```
import Vue from 'vue';
import V2Datepicker from 'v2-datepicker';

Vue.use(V2Datepicker)
```

```
// basic
<v2-datepicker v-model="val"></v2-datepicker>

//setting
<v2-datepicker v-model="val" lang="en" format="yyyy-MM-DD"></v2-datepicker>
```

## LICENSE
MIT