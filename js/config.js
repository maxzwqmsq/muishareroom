
// var apiServerPath = "http://139.196.168.162:8082/api/";
// var apiServerPath = "https://api.ucher.cn/";
var apiServerPath = "http://api.heidui.com/";
// 登录
var loginUrl = apiServerPath + "user/login";
var sendCodeUrl = apiServerPath + "code/sendVerificationCode";
var changepwdUrl=apiServerPath +'user/updatePassword';
var loginpwdUrl=apiServerPath +"user/loginByPassword";
//首页
var bannerListUrl = apiServerPath + "banner/list";
var noticeListUrl = apiServerPath + "notice/list";

// 公告详情
var noticeDetailUrl = apiServerPath + "notice/detail";


// 个人中心
var userUrl = apiServerPath + "user/detail";
var userUpdateUrl = apiServerPath + "user/update";
var msgListUrl = apiServerPath + "";
var casListUrl = apiServerPath + "pointDetail/detail"

//上传路径与路径填值
var uploadUrl =  apiServerPath + "ifile/upload";
var uploadFilePreUrl =  "http://m.heidui.com/f";


//老师列表
var teacherListUrl = apiServerPath + "teacher/list";
var teacherDetailUrl = apiServerPath + "teacher/detail"
var teacherLessonUrl = apiServerPath + "lesson/list";
var classcategoryUrl = apiServerPath+ "classcategory/category";
var shopUrl = apiServerPath+ "shop/info";
//老师认证
var teacherAuthUrl = apiServerPath + "teacher/authentication";
var teacherAuthInfoUrl = apiServerPath + "user/getAuthTeacherInfo";


//文章问答列表接口暂无
var questionListUrl = apiServerPath + "community/question/list";
var questionDetailUrl = apiServerPath + "community/question/detail";
var answerListUrl = apiServerPath + "community/answer/list";
var answerDetailUrl = apiServerPath + "community/answer/detail"
var addAnswerUrl = apiServerPath + "community/answer/add";
var commentListUrl = apiServerPath + "community/comment/list";
var commentAddUrl = apiServerPath + "community/comment/add";
var questionCategoryUrl = apiServerPath + "community/category/list"



//个人问题
var userAnswerUrl = apiServerPath + "community/user/answer"
var userQuestionUrl = apiServerPath + "community/user/question"
var userInfoUrl = apiServerPath + "community/user/info";
var questionAddUrl = apiServerPath + "community/question/add";
var acceptUrl = apiServerPath + "community/question/adopt";


// 文章部分
var articleListUrl = apiServerPath + "article/list";
var articleDetailUrl = apiServerPath + "article/detail";
var articleVideoUrl = apiServerPath + "article/add";
var articleDelUrl = apiServerPath + "article/delete";


//地址列表
var addressListUrl = apiServerPath + "userAddress/list";
var setAddressUrl = apiServerPath + "userAddress/add";

//课程列表
var lessonListUrl = apiServerPath+ "student/list";
// 所有课程分类
var allCategoryUrl = apiServerPath + "classcategory/category"
//课程详情
var lessonDetailUrl = apiServerPath + "lesson/detail";
//视频列表
var videoListUrl = apiServerPath + "video/list";
var delVideoUrl = apiServerPath + "video/delete"
var videoDetailUrl = apiServerPath + "video/detail"

//订单
var orderListUrl = apiServerPath + "order/list";
var delOrderUrl = apiServerPath + "order/delete";
var orderDetailUrl = apiServerPath +'order/detail';
var addOrderUrl = apiServerPath + "order/add";
var orderaddUrl=apiServerPath +'order/add';
//提现
var getCashUrl = apiServerPath + "cashRecord/add";

// 商店认证url
var shopAuthenticationUrl = apiServerPath + "shop/authentication"
var shopAuthInfoUrl = apiServerPath + "shop/save";

//发布课程
var saveLessonUrl = apiServerPath + "lesson/save";
var shopListUrl = apiServerPath + "shop/list";
var myPubKcUrl = apiServerPath + "lesson/teacherLesson"
var delPubKcUrl = apiServerPath + "lesson/delete"
var pubOperationUrl = apiServerPath + "lesson/operation"
var pubVideoUrl = apiServerPath + "video/add";
var teacherLessonDetailUrl = apiServerPath + "lesson/teacherDetail";
var studentNumUrl = apiServerPath + "teacher/applicationDetail";
var teacherclassURL= apiServerPath + "classcategory/teacher";


//支付
var ALIPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=';
var WXPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total=';
