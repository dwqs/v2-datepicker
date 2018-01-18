![npm-version](https://img.shields.io/npm/v/v2-datepicker.svg) ![license](https://img.shields.io/npm/l/v2-datepicker.svg)
# v2-datepicker
A simple datepicker component based Vue 2.x.

## Installation

Install the pkg with npm:

```
npm i --save v2-datepicker
```
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

More demo to visit [here](https://dwqs.github.io/v2-datepicker).

## Available Props

### The v2-datepicker component

|  Attribute  |  Type  |  Accepted Values  |  Default  |  Description  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| value | Date | anything accepted by new Date | - | default date of the date-picker |
| lang | String | cn(chinese)/en(english) | cn | set local language of the date-picker |
| format | String | year `yyyy/YYYY`, month `MM`, day `dd` | yyyy/MM/dd | format of the displayed value in the span box |
| placeholder | String | - | 选择日期/Choosing date... | placeholder text |
| disabled | Boolean | - | false | disabled date-picker |

### The v2-daterange-picker component

|  Attribute  |  Type  |  Accepted Values  |  Default  |  Description  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| value | Array | anything accepted by new Date | - | default date of the daterange-picker |
| lang | String | cn(chinese)/en(english) | cn | set local language of the daterange-picker |
| format | String | year `yyyy/YYYY`, month `MM`, day `dd` | yyyy/MM/dd | format of the displayed value in the span box |
| placeholder | String | - | 开始时间-结束时间/Choosing date range... | placeholder text |
| disabled | Boolean | - | false | disabled daterange-picker |
| range-separator | String | - | '-' | range separator|
| unlink-panels | Boolean | - | false | unlink two date-panels in range-picker|

## Event

|  Event Name  |  Description  |  Parameters |
|  :--:  |  :--:  |  :--: |
| change | triggers when the selected value changes | component's binding value |

## Development

```js
git clone git@github.com:dwqs/v2-datepicker.git

cd v2-datepicker

npm i 

npm start
```

## LICENSE
MIT
