// import Mock from 'mockjs';
// import qs from 'querystring'
// Mock.mock('/api/message', 'post', {
//     code: 0,
//     msg: '',
//     data: {
//         'id|1-10': 1,
//         nickname: "@cname",
//         content: "@cparagraph(1,5)",
//         createDate: Mock.Random.datetime(),
//         'avatar|1': [
//             "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
//             "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
//             "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
//             "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
//         ],
//     },
// })
// Mock.mock(/^\/api\/message(\?.+)?$/, 'get', function(options){
// 	const query = qs.parse(options.url)
// 	return Mock.mock({
// 		code: 0,
// 		msg: "",
// 		data: {
// 			'total|30': 1,
// 			[`rows|${query.limit || 10}`]: [
// 				{
// 					id: '@guid',
// 					'nickname': "@cname",
// 					content: "@cparagraph(1,5)",
// 					createDate: Mock.Random.datetime(),
// 					'avatar|1': [
// 						"https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
// 						"https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
// 						"https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
// 						"https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
// 					]
// 				}],
// 		}
// 	})
// })