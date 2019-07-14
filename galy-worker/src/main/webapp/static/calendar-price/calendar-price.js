  $(function () {
    // 生成模拟数据
	var mockData = [];
	$.each(treamList,function(i,item){
		 mockData.push({
	      date: item.startDate,
	      child_price:item.childPrice,
	      adult_price:item.adultPrice,
	      left_num:item.leftNum,
	      min_num:item.minNum,
	      tId:item.tId,
	    });  
	});
var MOCK_DATA = mockData;
// 日历设置表单字段配置
// key 字段名
// name 表单label
// value 默认值
// placeholder input[placeholder]
var calendarConfig = [
  {
    key: 'min_num',
    name: '最小成团人数',
    value: 1000,
    type: 'number',
    placeholder: '请输入最小成团人数'
  },
  {
    key: 'left_num',
    name: '剩余人数',
    value: 1,
    type: 'number',
    placeholder: '请输入剩余人数'
  },
  {
    key: 'adult_price',
    name: '成人价',
    value: 100,
    type: 'number',
    placeholder: '请输入成人价'
  },
  {
    key: 'child_price',
    name: '儿童价',
    value: 100,
    type: 'number',
    placeholder: '请输入儿童价'
    	
  },
  {
	key: 'tId',
	name: '',
	value: 'tId',
	type: 'hidden',
	placeholder: ''
	}
]

// 日历中显示配置
var showConfig = [
  {
    key: 'adult_price',
    name: '成人:￥'
  },
  {
    key: 'child_price',
    name: '儿童:￥'
  },
  {
    key: 'left_num',
    name: '剩余:'
  },
  {
	 key:'tId',
	 name:'<span onclick="deletePrice(this)">删除</span>'
  }
]

// 样式颜色配置
var styleConfig = {
  // 头部背景色
  headerBgColor: '#098cc2',
  // 头部文字颜色
  headerTextColor: '#fff',
  // 周一至周日背景色，及文字颜色
  weekBgColor: '#098cc2',
  weekTextColor: '#fff',
  // 周末背景色，及文字颜色
  weekendBgColor: '#098cc2',
  weekendTextColor: '#fff',
  // 有效日期颜色
  validDateTextColor: '#333',
  validDateBgColor: '#fff',
  validDateBorderColor: '#eee',
  // Hover
  validDateHoverBgColor: '#098cc2',
  validDateHoverTextColor: '#fff',
  // 无效日期颜色
  invalidDateTextColor: '#ccc',
  invalidDateBgColor: '#fff',
  invalidDateBorderColor: '#eee',
  // 底部背景颜色
  footerBgColor: '#fff',
  // 重置按钮颜色
  resetBtnBgColor: '#77c351',
  resetBtnTextColor: '#fff',
  resetBtnHoverBgColor: '#55b526',
  resetBtnHoverTextColor: '#fff',
  // 确定按钮
  confirmBtnBgColor: '#098cc2',
  confirmBtnTextColor: '#fff',
  confirmBtnHoverBgColor: '#00649a',
  confirmBtnHoverTextColor: '#fff',
  // 取消按钮
  cancelBtnBgColor: '#fff',
  cancelBtnBorderColor: '#bbb',
  cancelBtnTextColor: '#999',
  cancelBtnHoverBgColor: '#fff',
  cancelBtnHoverBorderColor: '#bbb',
  cancelBtnHoverTextColor: '#666'
}

// 初始化日历
var zxCalendar = $.CalendarPrice({
  el: '.container',
  //startDate: '2017-08-02',
  //endDate: '2018-12-31',
  data: MOCK_DATA,
  // 配置需要设置的字段名称
  config: calendarConfig,
  // 配置在日历中要显示的字段
  show: showConfig,
  // 点击确定时的回调函数，返回当前设置数据
  callback: function (data){
      console.log(data)
	  $.ajax({
		  	url:baseUrl+"/productManage/addTreamDetail/",
			type: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify(data),
			success: function (data) {

			}
		});

    log('callback ....');
    log(data);
  },
  // 点击取消按钮回调
  cancel: function () {
    log('取消设置 ....');
    // 取消设置
    // 这里可以触发关闭设置窗口
    // ...
  },
  // 重置按钮
  reset: function () {
    log('数据重置成功！');
  },
  // 月份改变时的回调
  monthChange: function (month) {
    log('monthChange: ')
    log(month)
    // var newData = createMockData()
    // zxCalendar.update(newData)
  },
  error: function (err) {
    alert(err.msg);
  },
  // 自定义颜色
  style: styleConfig
  // 点击有效的某一触发的回调函数
  // 注意：配置了此参数，设置窗口无效，即不能针对日期做参数设置
  // 返回每天的数据
//        everyday: function (dayData) {
//            console.log('点击某日，返回当天的数据');
//            console.log(dayData);
//        },
  // 隐藏底部按钮（重置、确定、取消），前台使用该插件时，则需要隐藏底部按钮
//        hideFooterButton: true
});
log(zxCalendar)

// 监听设置表单提交
// 将阻止默认流程执行
// 继续执行默认流程，请执行参数next()
zxCalendar.$on('submit-form', function (data, next) {
  // data 设置的数据

  // 此处可以验证表单
  // 验证表单逻辑....
  // ....

  // 继续执行下一步
      next()
    })
  });

  function log (s) {
  }

