# nav-Solution
大导航用户体验优化方案


### step1
使用mouseener和mouseover事件控制菜单切换，也是绝大部分二级导航的实现方式

##### 效果gif

![](http://upload-images.jianshu.io/upload_images/2865721-8f63adfa7a680d5c.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 可优化点
1. 想要选择子导航上的选项，鼠标移动时不能触碰到主导航的其他tab。只能折线移动。这是很多网站没有优化的地方

2. 快速移动时，子导航也会快速切换

### step2
##### 解决方案
1.为子导航显示设置阶段计时器，触发事件时若鼠标在子导航内，则继续执行，若不在子导航内，则不执行

2.去抖，计时器代码段还未执行完就触发了二次事件时，立即清空计时器。即只执行最后一次代码段

##### 效果gif
![效果图](http://upload-images.jianshu.io/upload_images/2865721-0d61eda88aff1da6.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 可优化点
1. 很明显，切换主菜单延迟问题 
### step3
##### 解决方案
1. 用户行为预判，向量积。如果鼠标移动范围在三角形内，则用户极大可能是想要浏览子菜单，若不在范围内，则不需要使用延迟

更具体的说明请前往[博客](http://taoruyi.xyz/2017/11/28/%E3%80%9020171128%E3%80%91%E4%BA%AC%E4%B8%9C%E5%A4%A7%E5%AF%BC%E8%88%AA%E2%80%94%E2%80%94%E9%A2%84%E5%88%A4%E7%94%A8%E6%88%B7%E8%A1%8C%E4%B8%BA/)

##### 最终效果
![最终效果](http://upload-images.jianshu.io/upload_images/2865721-2efb5f3679710cb7.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
