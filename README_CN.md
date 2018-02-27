![npm-version](https://img.shields.io/npm/v/v2-datepicker.svg) ![license](https://img.shields.io/npm/l/v2-datepicker.svg)

# v2-datepicker
A simple datepicker component based Vue 2.x.

## 安装

npm:

```
npm i --save v2-datepicker
```
or yarn

```
yarn add  v2-datepicker
```

## 快速开始

```
import Vue from 'vue';
import V2Datepicker from 'v2-datepicker';

Vue.use(V2Datepicker)
```

```
// basic
<v2-datepicker v-model="val"></v2-datepicker>
<v2-datepicker-range v-model="val2"></v2-datepicker-range>

//setting
<v2-datepicker-range v-model="val" lang="en" format="yyyy-MM-DD" :picker-options="pickerOptions"></v2-datepicker-range>
<v2-datepicker v-model="val2" format="yyyy-MM-DD" :picker-options="pickerOptions2"></v2-datepicker>

export default {
    data () {
        return {
            pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            pickerOptions2: {
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick (picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            }
        }
    }
}
```

查看更多 [demo](https://dwqs.github.io/v2-datepicker).

## 可选属性

###  v2-datepicker 组件

|   属性  |  类型  |  可选值  |  默认值  |  描述  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| value | Date | 可被new Date()解析 | - | 默认的日期值 |
| lang | String | cn(chinese)/en(english) | cn | 选择语言 |
| format | String | year `yyyy/YYYY`, month `MM`, day `dd` | yyyy/MM/dd | 返回的日期格式 |
| placeholder | String | - | 选择日期/Choosing date... | 占位符 |
| disabled | Boolean | - | false | 是否禁用选择器 |
| picker-options | Object | - | {} | 当前时间日期选择器特有的选项参考下表 |

### v2-daterange-picker 组件

|   属性  |  类型  |  可选值  |  默认值  |  描述  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| value | Array | 可被new Date()解析 | - | 默认的日期范围值 |
| lang | String | cn(chinese)/en(english) | cn | 选择语言 |
| format | String | year `yyyy/YYYY`, month `MM`, day `dd` | yyyy/MM/dd | 返回的日期格式 |
| placeholder | String | - | 开始时间-结束时间/Choosing date range... | 占位符 |
| disabled | Boolean | - | false | 是否禁用选择器 |
| range-separator | String | - | '-' | 选择范围时的分隔符 |
| unlink-panels | Boolean | - | false | 在范围选择器里取消两个日期面板之间的联动 |
| picker-options | Object | - | {} | 当前时间日期选择器特有的选项参考下表 |

## Picker Options

|   属性  |  类型  |  可选值  |  默认值  |  描述  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| shortcuts | Object[] | - | - | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 |
| disabledDate | Function | - | - | 设置禁用状态，参数为当前日期，要求返回 Boolean |

### shortcuts

|   属性  |  类型  |  可选值  |  默认值  |  描述  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| text | String | - | - | 标题文本 |
| onClick | Function | - | - | 选中后的回调函数 |

## Event

|  事件名  |  描述  |  参数 |
|  :--:  |  :--:  |  :--: |
| change | 选择值发生改变时触发 | 组件绑定的值 |

## Development

```js
git clone git@github.com:dwqs/v2-datepicker.git

cd v2-datepicker

npm i 

npm start
```

## LICENSE
MIT
